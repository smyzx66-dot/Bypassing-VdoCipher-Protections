/*
 * 🚀 VdoCipher Aegis Ultimate Bypass (Internal Edition)
 * Targeted: Java AppAnalytics + Native libvdomain Checks
 */

(function() {
    'use strict';

    Java.perform(function() {
        console.log("\n[+] --- Starting Ultimate VdoCipher Bypass ---");

        const AppAnalytics = Java.use("com.vdocipher.aegis.analytics.internal.AppAnalytics");

        /**
         * 1. تزييف فحص الحزم المشبوهة (Anti-Package Detection)
         * [span_2](start_span)الكود في DEX يستخدم دالة 'a' مع قائمة حزم تم جلبها من الـ Native[span_2](end_span).
         */
        AppAnalytics.a.overload('android.content.Context', 'java.util.List').implementation = function(ctx, list) {
            // console.log("[*] Intercepted Package Scanner: Returning False (Safe)");
            return false; 
        };

        /**
         * 2. تعطيل فحص نظام الملفات المعقد (Mount/RW Protection)
         * [span_3](start_span)الدالة 'h' تقوم بقراءة مخرجات 'mount' وتبحث عن صلاحيات RW في أقسام النظام[span_3](end_span).
         * هذا هو أقوى فحص في الجافا، وتعطيله هنا يوقف كشف الروت العميق.
         */
        AppAnalytics.h.implementation = function() {
            // console.log("[*] Intercepted Mount Point Scan: Returning False (All RO)");
            return false; 
        };

        /**
         * 3. تصفير الـ Bitmask النهائي
         * الدالة 'a(Context)' هي التي تجمع كل نتائج الفحوصات (Root, Emulator, Debug) 
         * [span_4](start_span)في متغير واحد (int)[span_4](end_span). إرجاع 0 يعني "جهاز نظيف تماماً".
         */
        AppAnalytics.a.overload('android.content.Context').implementation = function(ctx) {
            // console.log("[✔] Overriding Threat Score to 0 (Clean Device)");
            return 0;
        };

        /**
         * 4. تزييف حالة تحميل المكتبة
         * [span_5](start_span)نضمن أن التطبيق يعتقد أن المكتبة محملة بنجاح (a = true) ليتجنب الانهيار[span_5](end_span).
         */
        AppAnalytics.a.value = true;

        /**
         * 5. التعامل مع طبقة الـ Native (C++)
         * [span_6](start_span)استهداف الدوال التي تظهر في ملف Strings وتستخدمها الجافا[span_6](end_span).
         */
        const nativeSymbols = [
            "Java_com_vdocipher_aegis_analytics_internal_AppAnalytics_r", // Root check
            "Java_com_vdocipher_aegis_analytics_internal_AppAnalytics_t", // Integrity check
            "Java_com_vdocipher_aegis_analytics_internal_AppAnalytics_d", // Debug check
            "Java_com_vdocipher_aegis_analytics_internal_AppAnalytics_e"  // Emulator check
        ];

        nativeSymbols.forEach(function(symbol) {
            const addr = Module.findExportByName("libvdomain.so", symbol);
            if (addr) {
                Interceptor.attach(addr, {
                    onLeave: function(retval) {
                        [span_7](start_span)// تصفير النتيجة الأصلية القادمة من المكتبة[span_7](end_span)
                        retval.replace(0); 
                    }
                });
                // console.log("[+] Hooked Native Symbol: " + symbol);
            }
        });

        /**
         * 6. حماية الـ Runtime (Anti-Execution)
         * [span_8](start_span)الكود يحاول تنفيذ أمر 'mount' عبر Runtime.exec()[span_8](end_span).
         */
        const Runtime = Java.use("java.lang.Runtime");
        Runtime.exec.overload('java.lang.String').implementation = function(cmd) {
            if (cmd === "mount" || cmd.includes("su")) {
                // تزييف مخرجات الأوامر الحساسة لتبدو وكأنها فارغة أو آمنة
                return this.exec("echo 'system /system ext4 ro,relatime 0 0'");
            }
            return this.exec(cmd);
        };

        console.log("[✔] --- All Protections Are Now Neutralized --- \n");
    });
})();
