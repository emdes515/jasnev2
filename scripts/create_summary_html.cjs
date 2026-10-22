const fs = require('fs');
const path = require('path');

const imgDir = 'C:/Users/Oskar/.gemini/antigravity/scratch/podsumowanie_ob/images';

function getBase64Img(filename) {
    const p = path.join(imgDir, filename);
    if (!fs.existsSync(p)) return '';
    const buf = fs.readFileSync(p);
    return `data:image/png;base64,${buf.toString('base64')}`;
}

const imgSouthwest = getBase64Img('fig_southwest_heartone.png');
const imgExhibit41 = getBase64Img('fig_exhibit_4_1_affect_model.png');
const imgExhibit42 = getBase64Img('fig_exhibit_4_2_circumplex.png');
const imgOBPoll = getBase64Img('fig_ob_poll_emotional_states.png');
const imgExhibit43 = getBase64Img('fig_exhibit_4_3_time_of_day.png');
const imgExhibit44 = getBase64Img('fig_exhibit_4_4_day_of_week.png');
const imgStaples = getBase64Img('fig_staples_exercise.png');
const imgExhibit45 = getBase64Img('fig_exhibit_4_5_cascading_ei.png');
const imgUrsula = getBase64Img('fig_ursula_burns_leadership.png');

const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Emotions and Moods – Chapter 4 Summary (Organizational Behavior)</title>
    <style>
        @page {
            size: A4 portrait;
            margin: 8mm 10mm 8mm 10mm;
        }
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }
        body {
            font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, Helvetica, Arial, sans-serif;
            font-size: 7.7pt;
            line-height: 1.27;
            color: #1e293b;
            background: #ffffff;
        }
        .header-banner {
            background: linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #0369a1 100%);
            color: #ffffff;
            padding: 7px 12px;
            border-radius: 5px;
            margin-bottom: 5px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .header-banner h1 {
            font-size: 11.5pt;
            font-weight: 800;
            letter-spacing: 0.2px;
            margin-bottom: 1px;
        }
        .header-banner .subtitle {
            font-size: 7.4pt;
            opacity: 0.92;
            font-weight: 400;
        }
        .header-banner .badge {
            background: rgba(255, 255, 255, 0.18);
            border: 1px solid rgba(255, 255, 255, 0.3);
            padding: 3px 8px;
            border-radius: 4px;
            font-size: 7.2pt;
            font-weight: 700;
            text-align: right;
            white-space: nowrap;
        }
        .section {
            margin-bottom: 5px;
        }
        .section-header {
            background-color: #f1f5f9;
            border-left: 3.5px solid #1e3a8a;
            padding: 2.5px 7px;
            margin-bottom: 4px;
            display: flex;
            align-items: baseline;
            gap: 6px;
            break-after: avoid;
        }
        .section-num {
            background-color: #1e3a8a;
            color: #ffffff;
            font-weight: 700;
            font-size: 7.2pt;
            padding: 1px 5px;
            border-radius: 3px;
        }
        .section-title {
            font-size: 8.8pt;
            font-weight: 700;
            color: #0f172a;
        }
        p {
            margin-bottom: 3px;
            text-align: justify;
        }
        .grid-2 {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 6px;
            margin-bottom: 4px;
        }
        .grid-3 {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            gap: 5px;
            margin-bottom: 4px;
        }
        .card {
            border: 1px solid #cbd5e1;
            border-radius: 4px;
            padding: 4px 6px;
            background-color: #f8fafc;
            break-inside: avoid;
        }
        .card-dark {
            border: 1px solid #94a3b8;
            border-left: 3.5px solid #334155;
            border-radius: 4px;
            padding: 4px 6px;
            background-color: #f1f5f9;
            break-inside: avoid;
        }
        .card h3, .card-dark h3 {
            font-size: 7.9pt;
            font-weight: 700;
            color: #1e3a8a;
            margin-bottom: 2px;
            border-bottom: 1px solid #e2e8f0;
            padding-bottom: 1.5px;
        }
        .card-dark h3 {
            color: #0f172a;
        }
        .def-box {
            background-color: #f0fdf4;
            border: 1px solid #bbf7d0;
            border-left: 3px solid #16a34a;
            padding: 3.5px 6px;
            border-radius: 4px;
            margin-bottom: 4px;
            break-inside: avoid;
        }
        .def-term {
            font-weight: 700;
            color: #15803d;
        }
        .case-box {
            background-color: #fffbeb;
            border: 1px solid #fde68a;
            border-left: 3px solid #d97706;
            padding: 4px 6px;
            border-radius: 4px;
            margin-bottom: 4px;
            font-size: 7.4pt;
            break-inside: avoid;
        }
        .case-box strong {
            color: #92400e;
        }
        .ethics-box {
            background-color: #fdf2f8;
            border: 1px solid #fbcfe8;
            border-left: 3px solid #db2777;
            padding: 4px 6px;
            border-radius: 4px;
            margin-bottom: 4px;
            font-size: 7.4pt;
            break-inside: avoid;
        }
        .ethics-box strong {
            color: #9d174d;
        }
        .csr-box {
            background-color: #f0f9ff;
            border: 1px solid #bae6fd;
            border-left: 3px solid #0284c7;
            padding: 4px 6px;
            border-radius: 4px;
            margin-bottom: 4px;
            font-size: 7.4pt;
            break-inside: avoid;
        }
        .csr-box strong {
            color: #0369a1;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 4px;
            font-size: 7.2pt;
            break-inside: avoid;
        }
        th, td {
            border: 1px solid #cbd5e1;
            padding: 2.5px 5px;
            text-align: left;
            vertical-align: top;
        }
        th {
            background-color: #1e3a8a;
            color: #ffffff;
            font-weight: 600;
        }
        tr:nth-child(even) td {
            background-color: #f8fafc;
        }
        ul {
            margin-left: 13px;
            margin-bottom: 3px;
        }
        li {
            margin-bottom: 1.5px;
            text-align: justify;
        }
        .img-container {
            text-align: center;
            margin: 2px 0;
            break-inside: avoid;
        }
        .img-container img {
            max-width: 100%;
            border-radius: 4px;
            border: 1px solid #cbd5e1;
            display: block;
            margin: 0 auto;
        }
        .img-caption {
            font-size: 6.7pt;
            color: #64748b;
            margin-top: 1.5px;
            font-style: italic;
            line-height: 1.2;
        }
        .page-break {
            page-break-before: always;
        }
        .footer-note {
            margin-top: 4px;
            padding-top: 3px;
            border-top: 1px solid #cbd5e1;
            font-size: 6.9pt;
            color: #64748b;
            text-align: center;
        }
        .stat-badge {
            background: #e0f2fe;
            color: #0369a1;
            font-weight: 700;
            padding: 0.5px 3.5px;
            border-radius: 3px;
            border: 1px solid #bae6fd;
            font-size: 7.1pt;
        }
    </style>
</head>
<body>

    <!-- ==================== PAGE 1 ==================== -->
    <div class="header-banner">
        <div>
            <h1>Emotions and Moods in Organizational Behavior</h1>
            <div class="subtitle">Complete Chapter 4 Comprehensive Analysis & Theoretical Synthesis (pp. 138–164)</div>
        </div>
        <div class="badge">Chapter 4<br>Objectives 4-1 to 4-7</div>
    </div>

    <div class="grid-2" style="align-items: center; margin-bottom: 4px;">
        <div>
            <div class="case-box" style="margin-bottom: 0;">
                <strong>Opening Case – Bringing Your Sense of Humor to Work (Southwest Airlines, pp. 139–140):</strong>
                Southwest Airlines prioritizes employees under the core philosophy that employees who are treated well will treat customers well, ultimately benefiting the business. Throughout its 44+ year history, Southwest cultivated an inclusive, fun culture with core rules: <em>"Don't take yourself too seriously"</em> and <em>"Don't be a jerk."</em>
                Late co-founder & CEO Herb Kelleher exemplified self-deprecating humor. Research demonstrates that leaders with a sense of humor are <span class="stat-badge">27% more motivating and admired</span>. Kelleher recognized that while competitors can easily buy tangible assets (faster airplanes), intangibles—exceptional customer service and unique culture—cannot be purchased. Flight attendants entertain passengers during delays with "gate games" and comedic announcements. Southwest ranked in Glassdoor's Top 25 Places to Work in 2021. During the COVID-19 pandemic, facing unprecedented financial strain, CEO Gary Kelly reduced his base salary to zero and instituted a 20% cut for senior executives, successfully protecting employee well-being and maintaining zero layoffs since 1971.
            </div>
        </div>
        <div class="img-container">
            <img src="${imgSouthwest}" alt="Southwest Airlines HeartOne" style="max-height: 110px; object-fit: cover; width: 100%;">
            <div class="img-caption">Southwest Airlines "HeartOne" livery and crew embodying workplace authenticity, joy, and positive emotional culture (p. 138).</div>
        </div>
    </div>

    <!-- SECTION 4-1 -->
    <div class="section">
        <div class="section-header">
            <span class="section-num">4-1</span>
            <span class="section-title">Differentiating Affect, Emotions, and Moods (pp. 140–144)</span>
        </div>
        <p><strong>The "Affective Revolution" in OB:</strong> Historically, organizational behavior theorists sought to create "emotion-free" organizations, treating emotions as disruptive friction (specifically focusing on anger). Today, OB recognizes that emotions are inseparable from cognition and work behavior. Affective events can provoke conflict (e.g., a Florida Taco Bell worker threw a hot bean burrito at a supervisor after being told to "stop being a crybaby") or immense motivation (e.g., Fausto Martinez's delight upon Amazon's minimum wage increase, which improved family life and eliminated the need for a second job).</p>

        <div class="grid-2">
            <div>
                <table>
                    <thead>
                        <tr>
                            <th style="width: 25%;">Dimension</th>
                            <th style="width: 37%;">Emotions</th>
                            <th style="width: 38%;">Moods</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>Causation</strong></td>
                            <td>Triggered by a specific, identifiable event or stimulus.</td>
                            <td>Cause is often general, unclear, or lacks a specific contextual stimulus.</td>
                        </tr>
                        <tr>
                            <td><strong>Duration</strong></td>
                            <td>Very brief (seconds or minutes).</td>
                            <td>Longer-lived (hours or days).</td>
                        </tr>
                        <tr>
                            <td><strong>Nature</strong></td>
                            <td>Discrete, specific, numerous (anger, fear, sadness, happiness, disgust, surprise).</td>
                            <td>Broad, diffuse dimensions: Positive Affect (PA) and Negative Affect (NA).</td>
                        </tr>
                        <tr>
                            <td><strong>Expressions</strong></td>
                            <td>Usually accompanied by distinct facial expressions and body language.</td>
                            <td>Generally not indicated by distinct facial expressions.</td>
                        </tr>
                        <tr>
                            <td><strong>Intensity</strong></td>
                            <td>High intensity; sharp experience.</td>
                            <td>Lower, milder emotional intensity.</td>
                        </tr>
                    </tbody>
                </table>
                <div class="def-box">
                    <span class="def-term">Affect:</span> A broad, overarching term covering the entire spectrum of feelings people experience, encompassing both discrete emotions and ongoing moods. Affect varies across its <strong>valence</strong> (positivity vs. negativity).
                </div>
            </div>
            <div class="img-container">
                <img src="${imgExhibit41}" alt="Exhibit 4-1: Affect, Emotions, and Moods" style="max-height: 145px; width: 100%; object-fit: contain;">
                <div class="img-caption">Exhibit 4-1: Conceptual relationships among Affect, Emotions, and Moods (p. 141).</div>
            </div>
        </div>

        <div class="grid-2">
            <div>
                <p><strong>Positive and Negative Affect & The Circumplex:</strong> Affect is categorized into <strong>Positive Affect (PA)</strong> (excitement, enthusiasm, elation at the high end; bored, sluggish at the low end) and <strong>Negative Affect (NA)</strong> (nervousness, stress, anxiety at the high end; calm, serene, relaxed at the low end).</p>
                <ul>
                    <li><strong>Non-neutrality:</strong> Emotions cannot be neutral. Neutrality equals being nonemotional.</li>
                    <li><strong>Outliers:</strong> Surprise does not fit cleanly into positive or negative dimensions.</li>
                    <li><strong>Affect Intensity:</strong> Individual differences in emotional depth. Affectively intense people experience both positive and negative feelings profoundly.</li>
                </ul>
            </div>
            <div class="img-container">
                <img src="${imgExhibit42}" alt="Exhibit 4-2: The Affective Circumplex" style="max-height: 135px; width: 100%; object-fit: contain;">
                <div class="img-caption">Exhibit 4-2: The Affective Circumplex model arranging valence and activation (p. 142).</div>
            </div>
        </div>

        <div class="grid-2">
            <div class="card">
                <h3>The Six Universal Basic Emotions</h3>
                <p>Researchers agree on six universal basic emotions: <strong>anger, fear, sadness, happiness, disgust, and surprise</strong>. Recognizing facial expressions is difficult across cultures with low mutual exposure. An AI machine learning study of 100 professional actors revealed dialect differences: people recognize vocal emotional cues significantly better from actors of their own country.</p>
            </div>
            <div class="card">
                <h3>Moral Emotions & Ethical Decisions</h3>
                <p><strong>Moral emotions</strong> carry ethical implications resulting from immediate cognitive appraisal (e.g., disgust at slurs, sympathy for suffering, anger at injustice). Moral anger motivates direct intervention (e.g., ER doctors advocating for suffering patients while sanctioning unethical peers). Research overturns classical views: <strong>ethical choices are primarily feeling-based, not cool logic</strong>. Ingroup-outgroup double standards cause people to judge outgroups far more harshly while granting leniency to ingroup members.</p>
            </div>
        </div>
    </div>

    <!-- ==================== PAGE 2 ==================== -->
    <div class="page-break"></div>

    <div class="section">
        <div class="section-header">
            <span class="section-num">4-1 & 4-2</span>
            <span class="section-title">Experiencing Affect Across Cultures & Functions of Emotions (pp. 144–146)</span>
        </div>

        <div class="grid-2">
            <div>
                <div class="def-box">
                    <span class="def-term">Positivity Offset:</span> The tendency where, at zero input (when nothing in particular is occurring), most people experience a mildly positive mood. In a study of British call center representatives, employees reported positive moods <span class="stat-badge">58% of the time</span> despite high daily stress.
                </div>
                <p><strong>Asymmetry of Negative Affect:</strong> Negative emotions produce negative moods easily because people dwell on events that created strong negative emotions <strong>five times as long</strong> as events that caused strong positive ones.</p>
                <p><strong>Cultural Valuation of Emotions:</strong> While basic emotional mechanisms are universal, cultures value emotions differently:</p>
                <ul>
                    <li><em>Positive-Valuing (e.g., Mexico, Brazil):</em> Emphasize and promote positive expressive affect.</li>
                    <li><em>Negative-Valuing (e.g., Japan, Russia):</em> Embrace negative emotions as constructive, aiding realistic coping, critical thinking, and situational acceptance. Negative affect is far less detrimental to physical and psychological health in Eastern than Western cultures.</li>
                    <li><em>Ideal Affect in Hiring:</em> European Americans convey more PA in applications than Hong Kong Chinese; European American hiring managers favor high-PA applicants, producing cultural hiring disparities.</li>
                </ul>
            </div>
            <div class="img-container">
                <img src="${imgOBPoll}" alt="OB Poll: Emotional States" style="max-height: 155px; width: 100%; object-fit: contain;">
                <div class="img-caption">OB Poll: Percentage of respondents reporting daily positive and negative emotions across countries (p. 145).</div>
            </div>
        </div>

        <div class="card-dark">
            <h3>The Function of Emotions: Rationality vs. Irrationality (pp. 145–146)</h3>
            <p>A widespread workplace myth asserts that showing emotion is inherently irrational and career-toxic (e.g., that crying at work destroys credibility). <strong>Empirical reality demonstrates that emotions make thinking more rational</strong>: they provide essential diagnostic data about how we perceive our environment and guide adaptive actions. Individuals in negative moods are often <em>better able to distinguish accurate from inaccurate information</em> than happy individuals. Positive affect consistently boosts task engagement, job attitudes, OCB, and long-term career success while suppressing CWBs.</p>
        </div>
    </div>

    <!-- SECTION 4-2 -->
    <div class="section">
        <div class="section-header">
            <span class="section-num">4-2</span>
            <span class="section-title">Sources and Determinants of Emotions and Moods (pp. 146–151)</span>
        </div>

        <div class="grid-2">
            <div>
                <div class="card">
                    <h3>1. Personality & Affect Intensity</h3>
                    <p>Affect has a stable trait baseline. Built-in positive affectivity is the <strong>strongest single predictor of employee engagement</strong> across 100+ studies. Affect intensity dictates whether emotions are experienced mildly or with acute profundity.</p>
                </div>
                <div class="card" style="margin-top: 3.5px;">
                    <h3>2. Time of Day (Diurnal Cycle)</h3>
                    <p>Positive affect rises after sunrise, peaks late morning (<span class="stat-badge">10:00 AM – 12:00 PM</span>), declines until early evening (6:00 PM), rebounds until midnight, and drops toward dawn. Negative affect fluctuates less but trends upward over the day, lowest early morning and highest late evening (Exhibit 4-3 tweet analysis). Shift workers can adapt circadian clocks using controlled light exposure.</p>
                </div>
                <div class="card" style="margin-top: 3.5px;">
                    <h3>3. Day of the Week</h3>
                    <p>In most countries (USA, China, Germany), positive affect peaks Friday–Sunday and is lowest Monday. Negative affect peaks Monday. However, Germans experience high negative affect on Sundays due to upcoming work stress. In Japan, <strong>positive affect is higher on Monday than Friday or Saturday</strong> (Exhibit 4-4).</p>
                </div>
                <div class="card" style="margin-top: 3.5px;">
                    <h3>4. Weather & Illusory Correlation</h3>
                    <p>Empirical evidence proves weather has negligible impact on mood for most people. Belief in weather effects stems from <strong>illusory correlation</strong> (associating unrelated events). Poor weather increases productivity only by eliminating outdoor leisure distractions, not via mood.</p>
                </div>
            </div>
            <div>
                <div class="img-container">
                    <img src="${imgExhibit43}" alt="Exhibit 4-3: Time of Day Effects" style="max-height: 195px; width: 100%; object-fit: contain;">
                    <div class="img-caption">Exhibit 4-3: Diurnal curves of Positive and Negative Affect from global tweet analysis (p. 147).</div>
                </div>
                <div class="card" style="margin-top: 3.5px;">
                    <h3>5. Cumulative Workplace Stress</h3>
                    <p>A continuous diet of low-level stressors produces compounding strain. Mounting stress severely degrades mood. Under extreme emotional stress, individuals display a biological defense response: <strong>psychological disengagement ("literally looking away")</strong>.</p>
                </div>
                <div class="card" style="margin-top: 3.5px;">
                    <h3>6. Social Interactions & Spillover</h3>
                    <p>Tepid social interactions breed boredom; volatile roller-coaster interactions foster bittersweet conflict. Negative workplace interactions spill over into home life, damaging domestic partnerships.</p>
                </div>
            </div>
        </div>
    </div>

    <!-- ==================== PAGE 3 ==================== -->
    <div class="page-break"></div>

    <div class="section">
        <div class="section-header">
            <span class="section-num">4-2 Cont.</span>
            <span class="section-title">Day-of-Week Variations, Sleep, Exercise, and Gender Identity (pp. 148–151)</span>
        </div>

        <div class="grid-2">
            <div class="img-container">
                <img src="${imgExhibit44}" alt="Exhibit 4-4: Day of Week Mood Effects" style="max-height: 220px; width: 100%; object-fit: contain;">
                <div class="img-caption">Exhibit 4-4: Day-of-week mood variations across USA, China, Germany, and Japan (p. 149).</div>
            </div>
            <div>
                <div class="card">
                    <h3>7. Sleep Quality & Wage Returns</h3>
                    <p><span class="stat-badge">62% of adults across 12 countries</span> report inadequate sleep length or quality. Sleep deprivation disrupts emotional control, decision-making, and job satisfaction while raising risks of depression and workplace injury. A UC San Diego study revealed that for sleep-deprived workers, <strong>a 1-hour increase in long-run average sleep increases wages by 16%</strong> (more than an entire year of additional schooling).</p>
                </div>
                <div class="card" style="margin-top: 3.5px;">
                    <h3>8. Exercise ("Sweat Therapy")</h3>
                    <p>Regular physical exercise consistently elevates positive mood, lowers perceived fatigue, buffers against persistent negative moods, and accelerates recovery from negative workplace experiences. Staples provides onsite boot camps, military crawls, and truck pushes during lunch breaks to foster employee energy and morale.</p>
                </div>
                <div class="card" style="margin-top: 3.5px;">
                    <h3>9. Gender Identity & Attribution Biases</h3>
                    <p>Gender differences in emotional display are trivial, small, and reflect societal socialization, stereotypes, and measurement artifacts rather than genuine differences. Yet harmful biases persist: a Denver female police commander was denied promotion to deputy chief after being labeled "emotional" and "immature." Research reveals <strong>attribution asymmetry</strong>: women's emotions are viewed as <em>dispositional</em> (personality), whereas men's emotions are attributed to <em>situational</em> factors (having a bad day).</p>
                </div>
            </div>
        </div>

        <div class="grid-2" style="align-items: center; margin-top: 3px;">
            <div class="img-container">
                <img src="${imgStaples}" alt="Staples Corporate Exercise" style="max-height: 95px; width: 100%; object-fit: cover;">
                <div class="img-caption">Staples headquarters onsite exercise classes and truck-pushing boot camps to enhance positive moods and health (p. 150).</div>
            </div>
            <div class="def-box">
                <span class="def-term">Core Finding:</span> Physical health, sleep quality, and exercise habits represent biological pillars that directly govern emotion regulation capacity, occupational performance, and psychological resilience against workplace stressors.
            </div>
        </div>
    </div>

    <!-- SECTION 4-3 -->
    <div class="section">
        <div class="section-header">
            <span class="section-num">4-3</span>
            <span class="section-title">Emotional Labor, Acting Strategies, and Dissonance (pp. 151–153)</span>
        </div>
        <p><strong>Emotional Labor:</strong> An employee's expression of organizationally desired emotions during interpersonal transactions. Service roles require substantial emotional exertion (flight attendants must be cheerful, funeral directors solemn, physicians neutral).</p>

        <div class="grid-2">
            <div class="card">
                <h3>Surface Acting (Displayed Emotions)</h3>
                <p>Hiding felt feelings and faking required expressions (e.g., smiling when frustrated). Highly exhausting because it requires continuous suppression. Associated with <strong>stress, reduced job satisfaction, emotional exhaustion, work-family conflict, absenteeism, and insomnia</strong>. In remote work, email masks leakage, while video (Zoom) demands high authenticity.</p>
            </div>
            <div class="card">
                <h3>Deep Acting (Felt Emotions)</h3>
                <p>Actively modifying true inner feelings to align with organizational display rules. Deals directly with authentic felt emotions. Associated with <strong>higher job satisfaction, enhanced task performance, better customer service evaluations, and higher customer tips</strong>.</p>
            </div>
        </div>

        <div class="grid-2">
            <div class="def-box">
                <span class="def-term">Emotional Dissonance:</span> Inconsistencies between the emotions people feel and the emotions they project. Chronic dissonance results in severe job burnout, alcohol abuse, performance collapse, and aggressive workplace outbursts. Buffered by high EI, adequate sleep, and job autonomy to help others.
            </div>
            <div class="card">
                <h3>Display Rules & Customer Interaction</h3>
                <p>Sales employees perform best under <strong>moderate display rules paired with high job discretion</strong>; extremely high or non-existent display rules degrade sales performance. Racial stereotypes can bias informal rules: Black grocery store workers are often perceived as less warm, compelling them to expend greater emotional labor to match performance ratings.</p>
            </div>
        </div>

        <div class="case-box">
            <strong>Myth or Science? All Employees Experience Emotional Labor in the Same Way (p. 152) – MYTH:</strong>
            Emotional labor is significantly more taxing for <strong>introverts</strong> than extroverts. Surface acting leads to greater emotional exhaustion and negative affect in introverts. Extroverts have higher sociability and emotional coping capacity, though deep acting's positive and negative effects both influence them. Organizations can mitigate emotional strain by training workers to <em>frame customer demands as challenges rather than threats</em>.
        </div>
    </div>

    <!-- SECTION 4-4 -->
    <div class="section">
        <div class="section-header">
            <span class="section-num">4-4</span>
            <span class="section-title">Affective Events Theory - AET (p. 153)</span>
        </div>
        <div class="card">
            <p><strong>Affective Events Theory (AET)</strong> posits that workplace occurrences (daily hassles and uplifts) trigger positive or negative emotional reactions, which are moderated by employee personality and moods, directly determining subsequent <strong>job satisfaction and job performance</strong>.</p>
            <ul>
                <li><strong>Accumulation Principle:</strong> Minor daily events accumulate over time to create major organizational shifts. Managers must never disregard small affective incidents.</li>
                <li><strong>Case Evidence:</strong> Lisamarie, a benefits administrator undergoing IVF, was devastated when her employer abruptly canceled coverage, breaking down for a week and experiencing collapsed job satisfaction.</li>
                <li><strong>Customer Mistreatment:</strong> Research indicates that mistreatment by customers accounts for <span class="stat-badge">nearly 50% of all negative affective work events</span> for part-time workers.</li>
                <li><strong>Remote Work Affective Events:</strong> Range from seamless, productive Zoom calls (positive event) to persistent connection failures with undiagnosed high-pitched audio screeches (negative event).</li>
            </ul>
        </div>
    </div>

    <!-- ==================== PAGE 4 ==================== -->
    <div class="page-break"></div>

    <!-- SECTION 4-5 -->
    <div class="section">
        <div class="section-header">
            <span class="section-num">4-5</span>
            <span class="section-title">Emotional Intelligence - EI (pp. 153–156)</span>
        </div>

        <div class="grid-2">
            <div>
                <p><strong>Definition:</strong> Emotional Intelligence (EI) is a person's capability to (1) <strong>perceive</strong> emotions in self and others, (2) <strong>understand</strong> the meaning of these emotions, and (3) <strong>regulate</strong> one's own emotions accordingly.</p>
                <div class="case-box">
                    <strong>CEO Case (Terrie Upshur-Lupberger):</strong> Despite leading a top talent company, she became resentful and burned out ("out on the skinny branch that breaks in a strong wind") by ignoring her emotional swings. Her reflection: <em>"As a leader, you either pay attention to and manage the moods in the organization, or you ignore them and pay the price."</em>
                </div>
                <div class="card">
                    <h3>Empirical Support for EI</h3>
                    <ul>
                        <li><strong>Hiring Preferences:</strong> In a CareerBuilder survey of 2,500 HR pros, <span class="stat-badge">59% would not hire</span> high-IQ/low-EI candidates, and <span class="stat-badge">75% would promote</span> high-EI over high-IQ candidates.</li>
                        <li><strong>Long-Term Career Earnings:</strong> EI predicted graduate salaries 10 years after college and likelihood of securing a mentor.</li>
                        <li><strong>U.S. Presidents:</strong> EI differentiated successful leaders (Roosevelt, Kennedy, Reagan) from unsuccessful ones (Johnson, Carter, Nixon).</li>
                        <li><strong>Sales & Teamwork:</strong> South Korean store managers with high EI generated higher sales by fostering cohesive, sales-oriented teams.</li>
                    </ul>
                </div>
            </div>
            <div>
                <div class="img-container">
                    <img src="${imgExhibit45}" alt="Exhibit 4-5: Cascading Model of EI" style="max-height: 160px; width: 100%; object-fit: contain;">
                    <div class="img-caption">Exhibit 4-5: A Cascading Model of Emotional Intelligence mapping traits to competencies (p. 154).</div>
                </div>
                <div class="card-dark" style="margin-top: 3.5px;">
                    <h3>The Cascading Model (Exhibit 4-5)</h3>
                    <p>1. <strong>Conscientiousness</strong> supports <em>Perceiving Emotions</em> in self/others.<br>
                    2. <strong>Cognitive Ability</strong> enables <em>Understanding Emotion Meaning</em>.<br>
                    3. <strong>Emotional Stability</strong> drives <em>Regulating Emotions</em>.</p>
                </div>
                <div class="card" style="margin-top: 3.5px;">
                    <h3>Limits & Physiological Costs</h3>
                    <p>A study of Dutch administrative assistants showed self-focused EI decreased perceived stress but created <strong>adverse physiological costs</strong>. High-EI individuals can also manipulate personality tests by identifying socially desirable answers.</p>
                </div>
            </div>
        </div>

        <div class="ethics-box">
            <strong>An Ethical Choice: Should Managers Use Emotional Intelligence Tests in Hiring? (p. 155):</strong>
            <ul>
                <li><strong>No Standardized Instrument:</strong> MSCEIT, Trait EI Questionnaire, SJT of EI, and ECI-2 yield inconsistent cross-cultural baselines (e.g., score divergences between Indian and North American executives).</li>
                <li><strong>Fairness & Cultural Bias:</strong> Photo face recognition tests can be culturally biased. Low scorers perceive EI tests as unfair and develop negative views of the employer.</li>
                <li><strong>Role Specificity:</strong> A study of 600 Romanian participants found EI predicted performance only in social roles (sales, public service, hospital CEOs); it lacks validity for non-social jobs.</li>
                <li><strong>Construct Overlap:</strong> Questionable whether EI measures a distinct capability or simply repackages personality (Big Five) and General Mental Ability (GMA). High-EI applicants can also fake personality tests.</li>
            </ul>
        </div>
    </div>

    <!-- SECTION 4-6 -->
    <div class="section">
        <div class="section-header">
            <span class="section-num">4-6</span>
            <span class="section-title">Emotion Regulation: Strategies, Mechanisms, and Ethics (pp. 156–158)</span>
        </div>
        <div class="def-box">
            <span class="def-term">Emotion Regulation:</span> The active process of identifying and modifying felt emotions. Strongly predicts task performance in high-demand roles and promotes OCB. Neuroticism and low self-esteem hinder regulation. Workplace diversity promotes conscious regulation (younger workers regulate more around older peers; minority workers regulate to fit in).
        </div>

        <div class="grid-3">
            <div class="card">
                <h3>1. Emotional Suppression</h3>
                <p>Suppressing initial affective reactions. Ineffective as a daily strategy; damages health, mental ability, and relationships. <strong>Beneficial only in acute crises</strong> (e.g., a portfolio manager suppressing panic during a sudden stock crash to make rational plans).</p>
            </div>
            <div class="card">
                <h3>2. Cognitive Reappraisal</h3>
                <p>Reframing one's outlook on an emotional event (e.g., viewing job loss as a career reboot). Highly effective when stressors cannot be controlled. In an Israeli-Palestinian study, primed reappraisal increased conciliation for <span class="stat-badge">up to 5 months</span>. <em>Downside:</em> Can be used unethically to rationalize CWBs, and causes mental fatigue.</p>
            </div>
            <div class="card">
                <h3>3. Social Sharing (Venting)</h3>
                <p>Expressing feelings openly to prevent bottling up emotions. Effective only if the listener responds with <strong>support and validation</strong>. If ignored, the venter feels worse. Venting directly to the offending party escalates conflict.</p>
            </div>
        </div>

        <div class="grid-2">
            <div class="card">
                <h3>Abusive Supervision Study</h3>
                <p>Employees under abusive managers who used emotional suppression experienced significantly higher emotional exhaustion and work withdrawal than those utilizing cognitive reappraisal.</p>
            </div>
            <div class="card">
                <h3>Ethics of Regulation & "Fake It 'Til You Make It"</h3>
                <p>Acting happy can induce genuine positive affect. In a Starbucks experiment, customers instructed to act cheerful when ordering from a barista reported significantly better moods than those who kept the interaction purely efficient.</p>
            </div>
        </div>
    </div>

    <!-- ==================== PAGE 5 ==================== -->
    <div class="page-break"></div>

    <!-- SECTION 4-7 -->
    <div class="section">
        <div class="section-header">
            <span class="section-num">4-7</span>
            <span class="section-title">Applied Organizational Behavior: Key Workplace Applications (pp. 158–164)</span>
        </div>

        <div class="grid-2">
            <div class="card">
                <h3>1. Selection Process & Recruitment</h3>
                <p>Employers utilize EI assessments for high-contact roles. The U.S. Air Force revamped recruiter selection around EI, resulting in high-EI hires being <span class="stat-badge">2.6 times more successful</span>. Positive team members spread good moods across teams via emotional contagion. Practicing self-compassion protects job seekers against rejection distress.</p>
            </div>
            <div class="card">
                <h3>2. Decision-Making Processes</h3>
                <p>Positive moods enhance problem-solving and sound choices. Negative affect produces mixed outcomes: sadness maintains past patterns, while anger triggers stronger, hasty choices. Negative moods occasionally lead to higher risk-taking or greater originality.</p>
            </div>
        </div>

        <div class="grid-2">
            <div class="card">
                <h3>3. Creativity: Activating vs. Deactivating Affect</h3>
                <p>Debate: Do positive moods boost creative thinking, or does worry spur critical evaluation? <strong>Resolution: Mood activation level matters most.</strong> Activating moods (elation, anger, fear) spur creativity; deactivating moods (depression, sorrow, serenity) reduce it. A study of 428 students showed they performed best on creative tasks <em>when fatigued</em>, as tiredness freed the mind from mental rigidity.</p>
            </div>
            <div class="card">
                <h3>4. Motivation & Reinforcement Spirals</h3>
                <p>In a word puzzle experiment, participants who watched a funny video clip worked harder and solved more puzzles. Performance feedback triggers an <strong>upward reinforcement spiral</strong>: positive mood boosts performance, generating praise, which further elevates mood.</p>
            </div>
        </div>

        <div class="grid-2">
            <div class="card">
                <h3>5. Leadership Dynamics & Halftime Speeches</h3>
                <p>Transformational leaders who share positive emotions inspire higher follower task performance (Taiwanese military study). Leader sadness increases followers' analytical attention. <strong>Halftime Speeches:</strong> In 300+ locker room speeches, coaches sharing anger improved team performance only when delivered at <em>moderate intensity</em>. In corporate settings, leader anger sparks subordinate anxiety, retaliatory deviance, silence, and turnover.</p>
            </div>
            <div class="img-container">
                <img src="${imgUrsula}" alt="Ursula Burns" style="max-height: 110px; width: 100%; object-fit: contain;">
                <div class="img-caption">Ursula Burns (former Xerox CEO) speaking at the John Wooden Global Leadership Award; known as "listener-in-chief" utilizing empathy and positive emotional connection (p. 160).</div>
            </div>
        </div>

        <div class="grid-2">
            <div class="card">
                <h3>6. Negotiation Strategies</h3>
                <p>Displaying anger can induce concessions if the counterpart believes the negotiator has reached their limit. However, angry negotiators with less power or information achieve significantly worse outcomes because anger impairs perspective-taking. Experiencing genuine anger or regret damages future negotiations.</p>
            </div>
            <div class="card">
                <h3>7. Customer Service & Emotional Contagion</h3>
                <p><strong>Emotional Contagion:</strong> Catching emotions from others. Authentic employee positive emotions cause customers to feel satisfied, trust the company, and shop longer. When mistreated by customers, employees suffer emotional dissonance. Managers must intervene to interrupt negative contagion cycles.</p>
            </div>
        </div>

        <div class="csr-box">
            <strong>Toward a Better World: Scream Agency & Emotional CSR Communication (p. 162):</strong>
            Scream Agency (a Denver B-Corp PR firm founded by Laura Ledermann) assists brands (Hyatt, AAA, Mellow Mushroom) in crafting emotional storytelling around CSR. Four-stage approach: (1) identify social problem, (2) inform stakeholders, (3) convince of solution, (4) <strong>connect with audience emotions</strong>. In Spain, CSR messaging among 1,000 banking customers drove positive affect and bank identification. Internal messaging reduced strain among Hurricane Katrina survivors. <em>The Executive Pitfall:</em> CSR advocates often rely on the "rational business case"—however, <strong>rational justifications undermine moral emotions</strong>, leaving executives unmoved and less likely to take action.
        </div>

        <div class="grid-3">
            <div class="card">
                <h3>8. Work–Life Spillover</h3>
                <p>Positive and negative work moods spill over into domestic life, though work effects typically dissipate by the following morning. Marital crossover: a negative workday mood in one partner transfers to the spouse at night.</p>
            </div>
            <div class="card">
                <h3>9. Unethical Behaviors (CWBs)</h3>
                <p>Negative emotions drive deviance. Envy sparks credit-stealing and sabotage. <strong>Anger correlates directly with aggressive CWBs</strong> (coworker abuse, deviance), whereas sadness does not. Angry employees stay and continue acting aggressively.</p>
            </div>
            <div class="card">
                <h3>10. Safety and Workplace Injuries</h3>
                <p>Negative moods impair hazard coping via anxiety, distractibility, and freezing. In migrant workers and deployed military, <em>homesickness directly predicted workplace safety violations and accidents</em>. Employers should reassign employees in bad moods away from hazardous tasks.</p>
            </div>
        </div>
    </div>

    <!-- SUMMARY FOR MANAGERS -->
    <div class="section" style="margin-top: 4px;">
        <div class="section-header">
            <span class="section-num">Summary</span>
            <span class="section-title">Core Implications for Managers (p. 164)</span>
        </div>
        <div class="card-dark">
            <ul style="margin-bottom: 0;">
                <li><strong>Acknowledge Affective Reality:</strong> Emotions and moods are natural; effective management does not mean creating an artificial, emotion-free environment.</li>
                <li><strong>Expect Emotional Volatility:</strong> Emotional responses to workplace events are unpredictable. Cultivate regulation skills and respond with empathy.</li>
                <li><strong>Anticipate Policy Fallout:</strong> Managerial announcements trigger affective events. Anticipate employee emotional reactions and prepare constructive responses in advance.</li>
                <li><strong>Discourage Surface Acting & Suppression:</strong> Surface acting and emotional suppression lead to burnout and withdrawal. Foster deep acting, cognitive reappraisal, and authentic expression.</li>
                <li><strong>Model Authentic Positive Affect:</strong> Leaders must model genuine positive moods to enhance employee decision-making, motivation, and creative problem-solving.</li>
                <li><strong>Harness Service Contagion:</strong> Encourage authentic positive emotional displays in customer-facing roles to leverage contagion, improving customer loyalty and negotiation outcomes.</li>
            </ul>
        </div>
    </div>

    <div class="footer-note">
        Comprehensive Chapter 4 Summary (OB pp. 138–164). Generated with high-resolution original figures, exhibits, and empirical case analyses.
    </div>

</body>
</html>
`;

fs.writeFileSync('C:/Users/Oskar/.gemini/antigravity/scratch/podsumowanie_ob/Emotions_and_Moods_Summary.html', html, 'utf8');
console.log('Regenerated Emotions_and_Moods_Summary.html');
