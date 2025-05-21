document.addEventListener('DOMContentLoaded', function() {
    // 1. الحصول على العناصر من HTML
    const textInput = document.getElementById('textInput');
    const fontSelect = document.getElementById('fontSelect');
    const fontSizeInput = document.getElementById('fontSize');
    const fontSizeValueSpan = document.getElementById('fontSizeValue');
    const fontColorInput = document.getElementById('fontColor');
    const bgColorInput = document.getElementById('bgColor');

    const boldBtn = document.getElementById('boldBtn');
    const italicBtn = document.getElementById('italicBtn');
    const underlineBtn = document.getElementById('underlineBtn');

    const lineHeightInput = document.getElementById('lineHeight');
    const lineHeightValueSpan = document.getElementById('lineHeightValue');
    const letterSpacingInput = document.getElementById('letterSpacing');
    const letterSpacingValueSpan = document.getElementById('letterSpacingValue');

    const alignRightBtn = document.getElementById('alignRight');
    const alignCenterBtn = document.getElementById('alignCenter');
    const alignLeftBtn = document.getElementById('alignLeft');
    const alignJustifyBtn = document.getElementById('alignJustify');
    const alignButtons = document.querySelectorAll('.alignment-buttons .align-btn'); // مجموعة أزرار المحاذاة

    const resetBtn = document.getElementById('resetBtn');

    // 2. قيم افتراضية للميزات الجديدة (لتسهيل إعادة التعيين وحفظ الحالة)
    const defaultSettings = {
        fontFamily: 'Roboto, sans-serif',
        fontSize: '24', // بدون 'px' لأنه قيمة الـ input range
        fontColor: '#e0e0e0',
        bgColor: '#2b2b2b',
        fontWeight: 'normal',
        fontStyle: 'normal',
        textDecoration: 'none',
        lineHeight: '1.6',
        letterSpacing: '0', // بدون 'px'
        textAlign: 'right',
        textInputContent: 'أهلاً بك في مُغيّر الخطوط التفاعلي! جرب تغيير الخط، الحجم، الألوان، الأنماط، والمحاذاة وشاهد كيف يبدو نصك. هذا الموقع يساعدك في تجربة أشكال مختلفة للنص.'
    };

    // 3. دالة لتطبيق جميع الأنماط
    function applyStyles() {
        // تطبيق الأنماط الأساسية
        textInput.style.fontFamily = fontSelect.value;
        textInput.style.fontSize = fontSizeInput.value + 'px';
        textInput.style.color = fontColorInput.value;
        textInput.style.backgroundColor = bgColorInput.value;

        // تطبيق أنماط B, I, U
        textInput.style.fontWeight = boldBtn.classList.contains('active') ? 'bold' : 'normal';
        textInput.style.fontStyle = italicBtn.classList.contains('active') ? 'italic' : 'normal';
        textInput.style.textDecoration = underlineBtn.classList.contains('active') ? 'underline' : 'none';

        // تطبيق تباعد الأسطر والأحرف
        textInput.style.lineHeight = lineHeightInput.value;
        textInput.style.letterSpacing = letterSpacingInput.value + 'px';

        // تحديث قيم الـ span
        fontSizeValueSpan.textContent = fontSizeInput.value + 'px';
        lineHeightValueSpan.textContent = lineHeightInput.value;
        letterSpacingValueSpan.textContent = letterSpacingInput.value + 'px';

        // حفظ الإعدادات تلقائياً بعد كل تغيير
        saveSettings();
    }

    // 4. دالة لتحميل الإعدادات المحفوظة
    function loadSettings() {
        let savedSettings = localStorage.getItem('fontChangerSettings');
        if (savedSettings) {
            savedSettings = JSON.parse(savedSettings);

            // تطبيق الإعدادات المحفوظة على عناصر التحكم
            fontSelect.value = savedSettings.fontFamily || defaultSettings.fontFamily;
            fontSizeInput.value = savedSettings.fontSize || defaultSettings.fontSize;
            fontColorInput.value = savedSettings.fontColor || defaultSettings.fontColor;
            bgColorInput.value = savedSettings.bgColor || defaultSettings.bgColor;
            lineHeightInput.value = savedSettings.lineHeight || defaultSettings.lineHeight;
            letterSpacingInput.value = savedSettings.letterSpacing || defaultSettings.letterSpacing;
            textInput.value = savedSettings.textInputContent || defaultSettings.textInputContent;


            // تطبيق حالة الأزرار (Bold, Italic, Underline)
            savedSettings.fontWeight === 'bold' ? boldBtn.classList.add('active') : boldBtn.classList.remove('active');
            savedSettings.fontStyle === 'italic' ? italicBtn.classList.add('active') : italicBtn.classList.remove('active');
            savedSettings.textDecoration === 'underline' ? underlineBtn.classList.add('active') : underlineBtn.classList.remove('active');

            // تطبيق حالة أزرار المحاذاة
            alignButtons.forEach(button => {
                if (button.dataset.align === savedSettings.textAlign) {
                    button.classList.add('active');
                    textInput.style.textAlign = savedSettings.textAlign; // تطبيق المحاذاة مباشرة
                } else {
                    button.classList.remove('active');
                }
            });

        } else {
            // إذا لم تكن هناك إعدادات محفوظة، قم بتطبيق الإعدادات الافتراضية
            resetSettings(false); // لا تحفظ بعد إعادة التعيين هنا
        }
        // تطبيق الأنماط لضمان تحديث الـ textarea
        applyStyles();
    }

    // 5. دالة لحفظ الإعدادات في Local Storage
    function saveSettings() {
        const currentSettings = {
            fontFamily: fontSelect.value,
            fontSize: fontSizeInput.value,
            fontColor: fontColorInput.value,
            bgColor: bgColorInput.value,
            fontWeight: boldBtn.classList.contains('active') ? 'bold' : 'normal',
            fontStyle: italicBtn.classList.contains('active') ? 'italic' : 'normal',
            textDecoration: underlineBtn.classList.contains('active') ? 'underline' : 'none',
            lineHeight: lineHeightInput.value,
            letterSpacing: letterSpacingInput.value,
            textAlign: textInput.style.textAlign, // حفظ المحاذاة الحالية
            textInputContent: textInput.value
        };
        localStorage.setItem('fontChangerSettings', JSON.stringify(currentSettings));
    }

    // 6. دالة لإعادة تعيين جميع الإعدادات إلى القيم الافتراضية
    function resetSettings(saveAfterReset = true) {
        fontSelect.value = defaultSettings.fontFamily;
        fontSizeInput.value = defaultSettings.fontSize;
        fontColorInput.value = defaultSettings.fontColor;
        bgColorInput.value = defaultSettings.bgColor;
        lineHeightInput.value = defaultSettings.lineHeight;
        letterSpacingInput.value = defaultSettings.letterSpacing;
        textInput.value = defaultSettings.textInputContent;

        // إعادة تعيين أزرار النمط
        boldBtn.classList.remove('active');
        italicBtn.classList.remove('active');
        underlineBtn.classList.remove('active');
        // تفعيل bold بشكل افتراضي إذا كان هذا هو التصرف المطلوب
        // boldBtn.classList.add('active'); // إذا أردت أن يبدأ بخط عريض افتراضياً

        // إعادة تعيين أزرار المحاذاة
        alignButtons.forEach(button => button.classList.remove('active'));
        alignRightBtn.classList.add('active'); // تفعيل المحاذاة لليمين افتراضياً

        // تطبيق الأنماط بعد إعادة التعيين
        textInput.style.fontWeight = defaultSettings.fontWeight;
        textInput.style.fontStyle = defaultSettings.fontStyle;
        textInput.style.textDecoration = defaultSettings.textDecoration;
        textInput.style.textAlign = defaultSettings.textAlign; // تطبيق المحاذاة الافتراضية

        applyStyles(); // تطبيق جميع الأنماط
        if (saveAfterReset) {
            saveSettings(); // حفظ الحالة الافتراضية بعد إعادة التعيين
        }
    }

    // 7. إضافة مستمعين للأحداث

    // لميزات الأنماط (B, I, U)
    boldBtn.addEventListener('click', function() {
        this.classList.toggle('active'); // تبديل حالة 'active'
        applyStyles();
    });

    italicBtn.addEventListener('click', function() {
        this.classList.toggle('active');
        applyStyles();
    });

    underlineBtn.addEventListener('click', function() {
        this.classList.toggle('active');
        applyStyles();
    });

    // لميزات تباعد الأسطر والأحرف (input event لتحديث فوري)
    lineHeightInput.addEventListener('input', applyStyles);
    letterSpacingInput.addEventListener('input', applyStyles);

    // لأزرار المحاذاة
    alignButtons.forEach(button => {
        button.addEventListener('click', function() {
            // إزالة 'active' من جميع الأزرار الأخرى
            alignButtons.forEach(btn => btn.classList.remove('active'));
            // إضافة 'active' للزر الذي تم النقر عليه
            this.classList.add('active');
            // تطبيق المحاذاة
            textInput.style.textAlign = this.dataset.align;
            applyStyles(); // حفظ الإعدادات بعد التغيير
        });
    });

    // لزر إعادة التعيين
    resetBtn.addEventListener('click', function() {
        resetSettings(true); // إعادة تعيين وحفظ
    });

    // لمستمعي الأحداث الأساسيين (موجودين مسبقاً)
    fontSelect.addEventListener('change', applyStyles);
    fontSizeInput.addEventListener('input', applyStyles);
    fontColorInput.addEventListener('input', applyStyles);
    bgColorInput.addEventListener('input', applyStyles);

    // عند تغيير النص في الـ textarea، نقوم بحفظ التغييرات
    textInput.addEventListener('input', saveSettings);

    // 8. تحميل الإعدادات عند بدء تشغيل الصفحة
    loadSettings();
});
