// LAB 기반 정교한 퍼스널 컬러 분석 로직

// 12계절 정의
const TWELVE_SEASONS = {
    'light_spring': { parent: 'spring', name: '라이트 봄', icon: '🌸' },
    'bright_spring': { parent: 'spring', name: '브라이트 봄', icon: '🌺' },
    'warm_spring': { parent: 'spring', name: '웜 봄', icon: '🌼' },
    'light_summer': { parent: 'summer', name: '라이트 여름', icon: '🌊' },
    'soft_summer': { parent: 'summer', name: '소프트 여름', icon: '💙' },
    'cool_summer': { parent: 'summer', name: '쿨 여름', icon: '💎' },
    'soft_autumn': { parent: 'autumn', name: '소프트 가을', icon: '🍂' },
    'warm_autumn': { parent: 'autumn', name: '웜 가을', icon: '🍁' },
    'deep_autumn': { parent: 'autumn', name: '딥 가을', icon: '🌰' },
    'cool_winter': { parent: 'winter', name: '쿨 겨울', icon: '❄️' },
    'bright_winter': { parent: 'winter', name: '브라이트 겨울', icon: '💠' },
    'deep_winter': { parent: 'winter', name: '딥 겨울', icon: '🌑' }
};

// LAB 값으로 퍼스널 컬러 분석
function analyzeColorFromLAB(l, a, b) {
    // 1. 명도 분석 (L: 0-100)
    const lightness = l;
    const isLight = lightness > 65;      // 밝음
    const isMedium = lightness >= 45 && lightness <= 65;  // 중간
    const isDark = lightness < 45;       // 어두움
    
    // 2. 언더톤 분석 (A축: 초록-빨강)
    const redGreenAxis = a;
    const isPink = redGreenAxis > 5;     // 핑크 언더톤
    const isNeutral = redGreenAxis >= -2 && redGreenAxis <= 5;  // 중성
    const isGreen = redGreenAxis < -2;   // 올리브/그린 언더톤
    
    // 3. 온도 분석 (B축: 파랑-노랑)
    const blueYellowAxis = b;
    const isWarm = blueYellowAxis > 8;   // 웜톤 (노란기 많음)
    const isCool = blueYellowAxis < 5;   // 쿨톤 (푸른기 많음)
    const isNeutralTemp = blueYellowAxis >= 5 && blueYellowAxis <= 8;
    
    // 4. 채도 분석 (Chroma: 색의 선명도)
    const chroma = Math.sqrt(a * a + b * b);
    const isMuted = chroma < 20;         // 은은함 (저채도)
    const isModerate = chroma >= 20 && chroma <= 35;  // 중간
    const isVibrant = chroma > 35;       // 선명함 (고채도)
    
    // 5. 12계절 판단
    let season, confidence;
    let scores = {};
    
    // Light Spring: 밝음 + 웜 + 중간채도
    scores.light_spring = 0;
    if (isLight) scores.light_spring += 40;
    if (isWarm) scores.light_spring += 30;
    if (isModerate || isVibrant) scores.light_spring += 20;
    if (isPink || isNeutral) scores.light_spring += 10;
    
    // Bright Spring: 밝음 + 웜 + 고채도
    scores.bright_spring = 0;
    if (isLight) scores.bright_spring += 35;
    if (isWarm) scores.bright_spring += 30;
    if (isVibrant) scores.bright_spring += 30;
    if (isPink) scores.bright_spring += 5;
    
    // Warm Spring: 중간명도 + 웜 + 중간채도
    scores.warm_spring = 0;
    if (isMedium || isLight) scores.warm_spring += 30;
    if (isWarm) scores.warm_spring += 40;
    if (isModerate) scores.warm_spring += 20;
    if (isGreen || isNeutral) scores.warm_spring += 10;
    
    // Light Summer: 밝음 + 쿨 + 저채도
    scores.light_summer = 0;
    if (isLight) scores.light_summer += 40;
    if (isCool) scores.light_summer += 30;
    if (isMuted || isModerate) scores.light_summer += 20;
    if (isPink) scores.light_summer += 10;
    
    // Soft Summer: 중간명도 + 쿨/중성 + 저채도
    scores.soft_summer = 0;
    if (isMedium) scores.soft_summer += 35;
    if (isCool || isNeutralTemp) scores.soft_summer += 30;
    if (isMuted) scores.soft_summer += 30;
    if (isNeutral) scores.soft_summer += 5;
    
    // Cool Summer: 중간명도 + 쿨 + 저-중간채도
    scores.cool_summer = 0;
    if (isMedium || isLight) scores.cool_summer += 30;
    if (isCool) scores.cool_summer += 40;
    if (isMuted || isModerate) scores.cool_summer += 20;
    if (isPink) scores.cool_summer += 10;
    
    // Soft Autumn: 중간명도 + 웜/중성 + 저채도
    scores.soft_autumn = 0;
    if (isMedium) scores.soft_autumn += 35;
    if (isWarm || isNeutralTemp) scores.soft_autumn += 30;
    if (isMuted) scores.soft_autumn += 30;
    if (isGreen || isNeutral) scores.soft_autumn += 5;
    
    // Warm Autumn: 중간-어두움 + 웜 + 중간채도
    scores.warm_autumn = 0;
    if (isMedium || isDark) scores.warm_autumn += 35;
    if (isWarm) scores.warm_autumn += 40;
    if (isModerate) scores.warm_autumn += 20;
    if (isGreen) scores.warm_autumn += 5;
    
    // Deep Autumn: 어두움 + 웜 + 중-고채도
    scores.deep_autumn = 0;
    if (isDark) scores.deep_autumn += 40;
    if (isWarm) scores.deep_autumn += 30;
    if (isModerate || isVibrant) scores.deep_autumn += 20;
    if (isGreen || isNeutral) scores.deep_autumn += 10;
    
    // Cool Winter: 중간-어두움 + 쿨 + 중간채도
    scores.cool_winter = 0;
    if (isMedium || isDark) scores.cool_winter += 35;
    if (isCool) scores.cool_winter += 40;
    if (isModerate) scores.cool_winter += 20;
    if (isPink) scores.cool_winter += 5;
    
    // Bright Winter: 중간명도 + 쿨 + 고채도
    scores.bright_winter = 0;
    if (isMedium || isLight) scores.bright_winter += 30;
    if (isCool) scores.bright_winter += 35;
    if (isVibrant) scores.bright_winter += 30;
    if (isPink) scores.bright_winter += 5;
    
    // Deep Winter: 어두움 + 쿨 + 고채도
    scores.deep_winter = 0;
    if (isDark) scores.deep_winter += 40;
    if (isCool) scores.deep_winter += 35;
    if (isVibrant) scores.deep_winter += 20;
    if (isPink || isNeutral) scores.deep_winter += 5;
    
    // 가장 높은 점수를 받은 계절 찾기
    let maxScore = 0;
    let topSeason = 'warm_spring';
    for (let s in scores) {
        if (scores[s] > maxScore) {
            maxScore = scores[s];
            topSeason = s;
        }
    }
    
    // 신뢰도 계산 (0-100%)
    confidence = Math.min(95, Math.round((maxScore / 100) * 100));
    
    // 부모 계절 (4계절)
    const parentSeason = TWELVE_SEASONS[topSeason].parent;
    
    return {
        season: parentSeason,           // 4계절
        subSeason: topSeason,           // 12계절
        seasonName: TWELVE_SEASONS[topSeason].name,
        confidence: confidence,
        isWarm: isWarm || isNeutralTemp && !isCool,
        lightness: Math.round(lightness),
        chroma: Math.round(chroma),
        undertone: isPink ? 'pink' : isGreen ? 'olive' : 'neutral',
        details: {
            l: Math.round(l * 10) / 10,
            a: Math.round(a * 10) / 10,
            b: Math.round(b * 10) / 10,
            lightnessLevel: isLight ? 'light' : isMedium ? 'medium' : 'dark',
            chromaLevel: isMuted ? 'muted' : isModerate ? 'moderate' : 'vibrant',
            temperature: isWarm ? 'warm' : isCool ? 'cool' : 'neutral'
        }
    };
}

// 3부위 편차 분석 (피부 균일도)
function analyzeVariance(forehead, cheek, jawline) {
    const lVariance = Math.abs(forehead.l - cheek.l) + Math.abs(cheek.l - jawline.l) + Math.abs(forehead.l - jawline.l);
    const aVariance = Math.abs(forehead.a - cheek.a) + Math.abs(cheek.a - jawline.a) + Math.abs(forehead.a - jawline.a);
    const bVariance = Math.abs(forehead.b - cheek.b) + Math.abs(cheek.b - jawline.b) + Math.abs(forehead.b - jawline.b);
    
    const totalVariance = lVariance + aVariance + bVariance;
    const isUniform = totalVariance < 15;  // 균일함
    const hasRedness = aVariance > 5;      // 홍조 가능성
    
    return {
        totalVariance: Math.round(totalVariance * 10) / 10,
        isUniform: isUniform,
        hasRedness: hasRedness,
        uniformityScore: Math.max(0, 100 - totalVariance * 2),
        note: isUniform ? '피부톤이 균일합니다' : hasRedness ? '부위별 차이가 있습니다 (홍조 가능성)' : '부위별 차이가 있습니다'
    };
}
