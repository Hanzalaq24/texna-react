// Setup type definitions for built-in Supabase Edge Functions
// @ts-ignore
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const FAST2SMS_API_KEY = "lM2bXxacv1P4dFCDSQUoweEAZyrBpWhNYsuGHfnKgJIV986mtL4XhUcdnEVHIRJ0t2masBp3LQKowOP1";

// @ts-ignore
serve(async (req: Request) => {
    // Support CORS
    if (req.method === 'OPTIONS') {
        return new Response('ok', {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
            },
        });
    }

    try {
        const body = await req.json();

        // Supabase "Send SMS Hook" Payload Structure:
        // {
        //   "user": { "phone": "+123..." },
        //   "sms": { "otp": "123456" }
        // }

        const phone = body.user?.phone;
        const otp = body.sms?.otp;

        // We need to extract the raw number without +91 for Fast2SMS if they require 10 digits, 
        // OR keep strict format. Fast2SMS 'numbers' param usually takes simple 10 digit or comma separated.
        // Let's sanitize to last 10 digits for safety if it's an Indian number.
        const rawPhone = phone ? phone.replace(/\D/g, '') : '';
        const validPhone = rawPhone.slice(-10); // Take last 10 digits

        if (!validPhone) {
            throw new Error("Invalid phone number format");
        }

        console.log(`Sending OTP ${otp} to ${validPhone} via Fast2SMS (Quick Route)...`);

        // Using Route 'q' (Quick SMS) to bypass strict DLT/Website Verification if possible.
        // Quick SMS often requires 'message' and 'language' instead of 'variables_values'.
        // Route: "q" (Quick SMS) | "otp" (OTP Route)

        const response = await fetch("https://www.fast2sms.com/dev/bulkV2", {
            method: "POST",
            headers: {
                "authorization": FAST2SMS_API_KEY,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "route": "q",
                "message": `Your Texna Login OTP is ${otp}`,
                "language": "english",
                "flash": 0,
                "numbers": validPhone,
            }),
        });

        const data = await response.json();
        console.log("Fast2SMS Response:", data);

        if (data.return === false) {
            throw new Error(`Fast2SMS Error: ${data.message}`);
        }

        return new Response(
            JSON.stringify({ success: true, message: "OTP sent successfully" }),
            { headers: { "Content-Type": "application/json" } },
        )
    } catch (error: any) {
        console.error("Error sending SMS:", error);
        return new Response(
            JSON.stringify({ error: error.message }),
            { status: 400, headers: { "Content-Type": "application/json" } },
        )
    }
})
