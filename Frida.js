/*
 * 🛡️ THE ARMORED FRIDA BYPASS: VdoCipher libvdomain Edition
 * Targeted: Native Detection, JNI Checks, and File-system Invisibility
 */

(function() {
    'use strict';

    function bypassVdoProtections() {
        console.log("[⚡] Initializing Armored Bypass for libvdomain.so...");

        // 1. استهداف كلاس التحليلات والحماية المذكور في ملف الـ Strings
        [span_5](start_span)// المصدر:[span_5](end_span) Java_com_vdocipher_aegis_analytics_internal_AppAnalytics
        const vdoClassPath = "com.vdocipher.aegis.analytics.internal.AppAnalytics";
        
        Java.perform(() => {
            try {
                const AppAnalytics = Java.use(vdoClassPath);
                
                [span_6](start_span)// تعطيل دوال الكشف الأساسية (المستهدفة في JNI)[span_6](end_span)
                const detectionMethods = ['a', 'b', 'c', 'q', 't'];
                detectionMethods.forEach(method => {
                    AppAnalytics[method].overload().implementation = function() {
                        // console.log(`[✔] Neutralized check: ${method}`);
                        return 0; // إرجاع 0 (No Threats Found)
                    };
                });
            } catch (err) {
                console.log("[!] AppAnalytics class not found in Java layer yet.");
            }

            [span_7](start_span)// 2. إخفاء ملفات النظام والمجلدات المشبوهة[span_7](end_span)
            const File = Java.use("java.io.File");
            const forbidden = [
                "su", "magisk", "xposed", "edxposed", "luckypatcher", 
                "bin/failsafe", "xbin", "sbin", "test-keys"
            ];

            File.exists.implementation = function() {
                const path = this.getAbsolutePath();
                for (const item of forbidden) {
                    if (path.indexOf(item) !== -1) return false;
                }
                return this.exists();
            };

            [span_8](start_span)// 3. تخطي فحوصات الـ Build Tags (test-keys)[span_8](end_span)
            const SystemProperties = Java.use("android.os.SystemProperties");
            SystemProperties.get.overload('java.lang.String').implementation = function(key) {
                if (key === "ro.build.tags") return "release-keys";
                if (key === "ro.secure") return "1";
                if (key === "ro.debuggable") return "0";
                return this.get(key);
            };
        });

        [span_9](start_span)[span_10](start_span)// 4. تعطيل الـ Native Anti-Debug و Ptrace Bypass[span_9](end_span)[span_10](end_span)
        const ptrace = Module.findExportByName(null, "ptrace");
        if (ptrace) {
            Interceptor.replace(ptrace, new NativeCallback(() => {
                return 0;
            }, 'int', ['int', 'int', 'pointer', 'pointer']));
            console.log("[✔] Native Ptrace Shield Active.");
        }

        [span_11](start_span)// 5. استهداف مباشر لـ libvdomain.so وإصابة الـ JNI Exports[span_11](end_span)
        const moduleName = "libvdomain.so";
        const targetFunctions = [
            "Java_com_vdocipher_aegis_analytics_internal_AppAnalytics_a",
            "Java_com_vdocipher_aegis_analytics_internal_AppAnalytics_b",
            "Java_com_vdocipher_aegis_analytics_internal_AppAnalytics_c",
            "Java_com_vdocipher_aegis_analytics_internal_AppAnalytics_q",
            "Java_com_vdocipher_aegis_analytics_internal_AppAnalytics_t"
        ];

        Process.enumerateModules().forEach(m => {
            if (m.name === moduleName) {
                targetFunctions.forEach(funcName => {
                    const addr = Module.findExportByName(m.name, funcName);
                    if (addr) {
                        Interceptor.attach(addr, {
                            onLeave: function(retval) {
                                // إجبار المكتبة الأصلية على إعطاء رد "آمن" للجافا
                                retval.replace(0x0); 
                            }
                        });
                        console.log(`[✔] Hooked Native Export: ${funcName}`);
                    }
                });
            }
        });
    }

    // التنفيذ الفوري
    setImmediate(bypassVdoProtections);

})();
