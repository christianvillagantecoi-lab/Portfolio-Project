const aiProfileImage = 'images/Villagante.jpg';
const aiSessionStorageKey = 'kousei_ai_current_session';
const aiHistoryStorageKey = 'kousei_ai_session_history';
let aiSessionId = localStorage.getItem(aiSessionStorageKey) || `session_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
let aiSessionMessages = [];
let aiSessionTitle = 'New AI conversation';
let aiSessionReady = false;
let aiAvailability = 'online';
localStorage.setItem(aiSessionStorageKey, aiSessionId);

const resumeKnowledge = {
  name: 'Christian Arbado Villagante',
  age: 'Christian Arbado Villagante is 21 years old.',
  role: 'Graphic and Web Designer',
  education: 'Christian Arbado Villagante is a fourth-year Bachelor of Science in Information Technology student at Philippine Christian University in Manila, currently in his first semester. He expects to graduate in 2027.',
  summary: 'Christian Arbado Villagante is a 21-year-old fourth-year Information Technology student, Graphic and Web Designer, video editor, and content creator.',
  skills: 'His technical skills include HTML5, CSS3, JavaScript, Python, SQL, and MySQL. His creative tools include Adobe Premiere Pro, DaVinci Resolve, CapCut, and Adobe Photoshop. He also works with Microsoft Word, Excel, and PDF tools.',
  projects: 'The projects listed in Christian\'s resume are: Functionable Website Portfolio, Online Book Store Web Application, and Multimedia Asset Optimization & Technical Workflow Project. His uploaded portfolio may also contain additional Major Projects and Minor Projects managed through the Projects section.',
  experience: 'His experience includes frontend web development and design, database and web application development, and digital media asset optimization. He focuses on clean code, responsive UI/UX, cross-browser compatibility, and organized technical workflows.',
  awards: "Christian has earned Outstanding Dean's List recognition for his first, second, and third years, plus an Outstanding Performance in Object Oriented Programming certificate.",
  contact: 'You can contact Christian at kouseilarscii@gmail.com. You can also use the Contact Me tab to send a message, or use the social links in the footer.',
  interests: 'Christian enjoys art, making videos for fun, video editing, graphic design, photo manipulation, frontend development, application design, databases, and playing Genshin Impact.',
  determination: 'Christian is a determined and talented person, especially in the arts and video creation. He enjoys making videos for fun, learning creative tools, building practical projects, and continuing even when work is challenging.',
  personality: 'Christian describes himself as a good, quiet, and shy person. He is not always comfortable in large groups, but he is determined, friendly, and fun to be with once people get to know him.',
  lifeRole: 'Christian’s biggest role in life is to keep growing as a kind, determined, and creative person while developing his skills as an IT student, web designer, video editor, and content creator.',
  advisor: 'Christian’s reference and academic advisor is John Joshua E. Mendoza, MIT, Program Head of the Bachelor of Science in Information Technology at Philippine Christian University. The resume lists his phone as 09544713059 and email as John.mendoza@pcu.edu.ph.',
  resumeProjects: 'Christian’s resume lists three projects under Projects & Academic Experience: Functionable Website Portfolio; Online Book Store Web Application; and Multimedia Asset Optimization & Technical Workflow Project. The Projects tab can also contain other uploaded Major and Minor Projects.',
  resumeProjectDetails: {
    first: 'The first resume project is Functionable Website Portfolio. It is an interactive frontend website built with HTML5, CSS3, and JavaScript, focused on clean structure, responsive UI/UX, cross-browser compatibility, and fast rendering.',
    second: 'The second resume project is Online Book Store Web Application. It is a database-driven e-commerce platform for browsing, filtering, and purchasing books, using Visual Studio with SQL/MySQL for inventory, authors, categories, and mock cart checkout logic.',
    third: 'The third resume project is Multimedia Asset Optimization & Technical Workflow Project. It covers digital media processing, file compression, rendering, cross-platform compatibility, video editing, graphic design, asset deployment, and balancing resolution, bitrate, and delivery speed.'
  }
};

const aiIntents = [
  { key: 'greeting', terms: ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'kamusta', 'how are you'], answer: 'Hello! I am Kousei AI. Ask me about Christian\'s resume, skills, education, projects, awards, or contact details.' },
  { key: 'help', terms: ['what can i ask', 'what should i ask', 'possible questions', 'question examples', 'what do you know', 'tell me everything', 'show me topics', 'qwords', 'keywords'], answer: 'You can ask me who Christian is, what he is good at, what technologies he knows, what he studied, where he studied, what projects he built, what experience he has, what awards he earned, what tools he uses, what he is interested in, how to contact him, or where to find each portfolio section.' },
  { key: 'identity', terms: ['who is christian', 'who is this person', 'who are you', 'about christian', 'tell me about christian', 'introduce christian', 'give me his profile', 'give me his bio', 'what kind of person is he', 'describe him'], answer: resumeKnowledge.summary },
  { key: 'name', terms: ['what is his name', 'what is he called', 'full name', 'real name', 'christian name', 'what his name', 'what his naem', 'name of the person'], answer: resumeKnowledge.name },
  { key: 'age', terms: ['how old is he', 'what age is he', 'his age', 'age of christian', 'how many years old', 'what is his current age'], answer: resumeKnowledge.age },
  { key: 'education', terms: ['education', 'educational background', 'school', 'study', 'studies', 'studying', 'college', 'university', 'degree', 'course', 'major', 'program', 'what did he study', 'what is he studying', 'where did he study', 'where does he study', 'what school is he in', 'when will he graduate', 'graduation', 'student'], answer: resumeKnowledge.education },
  { key: 'yearLevel', terms: ['what year is he', 'what year level', 'year level', 'fourth year', '4th year', 'first semester', 'which year in college', 'college year', 'current semester', 'is he fourth year'], answer: resumeKnowledge.education },
  { key: 'skills', terms: ['skill', 'skills', 'technology', 'technologies', 'tech stack', 'programming', 'programming language', 'coding language', 'software', 'tools', 'what can he do', 'what does he know', 'what does he know about', 'what is he good at', 'what is he great at', 'what is he great of', 'what is he best at', 'what are his strengths', 'what are his strongest skills', 'what are his strong points', 'what is his talent', 'what is he talented in', 'what are his abilities', 'what is his expertise', 'what is his specialization', 'what is he proficient in', 'what is he qualified for', 'what is he capable of', 'what can he build', 'what can he create', 'what does he specialize in'], answer: resumeKnowledge.skills },
  { key: 'projects', terms: ['project', 'projects', 'portfolio projects', 'portfolio work', 'what has he built', 'what did he build', 'what did he create', 'what has he created', 'what websites did he make', 'what applications did he make', 'bookstore', 'book store', 'online store', 'e commerce', 'website', 'websites', 'application', 'applications', 'app', 'apps', 'database project', 'school project', 'academic project', 'major project', 'minor project'], answer: resumeKnowledge.projects },
  { key: 'resumeProjects', terms: ['projects in resume', 'projects on resume', 'resume projects', 'what projects are listed', 'what projects are in his cv', 'name of his projects', 'names of projects', 'three projects', 'other projects beside calculator', 'projects besides calculator', 'what are the two other projects', 'what are his project names'], answer: resumeKnowledge.resumeProjects },
  { key: 'advisor', terms: ['advisor', 'adviser', 'professor', 'prof', 'teacher', 'instructor', 'reference', 'referee', 'program head', 'who is his professor', 'who is his adviser', 'who can recommend him', 'who is john joshua'], answer: resumeKnowledge.advisor },
  { key: 'personality', terms: ['personality', 'personal character', 'what kind of person', 'is he shy', 'is he quiet', 'is he friendly', 'is he a good person', 'how would he describe himself', 'what is he like socially'], answer: resumeKnowledge.personality },
  { key: 'determination', terms: ['determination', 'determined', 'motivation', 'what motivates him', 'what drives him', 'biggest role in life', 'purpose in life', 'life role', 'what does he live for', 'what is important to him'], answer: resumeKnowledge.determination },
  { key: 'interests', terms: ['interest', 'interests', 'what does he like', 'what is he interested in', 'what does he enjoy', 'passion', 'passions', 'hobby', 'hobbies', 'creative interests', 'favorite field', 'art', 'genshin', 'making videos for fun'], answer: resumeKnowledge.interests },
  { key: 'youtube', terms: ['youtube', 'youtube channel', 'channel', 'channel name', 'channel statistics', 'subscribers', 'subscriber count', 'channel views', 'video count', 'uploads', 'uploaded videos', 'latest video', 'newest video', 'most popular video', 'top video', 'best video', 'video likes', 'video comments', 'youtube content', 'youtube uploads', 'what does he upload', 'what videos does he make', 'what is his channel about'], answer: 'Christian’s YouTube channel is KouseiLarsCII. I can check the live channel statistics and loaded video information when the YouTube data is available.' },
  { key: 'projectData', terms: ['uploaded project', 'uploaded projects', 'major uploaded project', 'minor uploaded project', 'major project details', 'minor project details', 'project title', 'project description', 'project category', 'github project', 'github repository', 'live demo project', 'which projects were uploaded', 'what did he upload', 'what projects are in the manager'], answer: 'I can check the uploaded projects and separate them into Major Projects and Minor Projects.' },
  { key: 'experience', terms: ['experience', 'work experience', 'professional experience', 'work', 'career', 'developer', 'designer', 'background', 'frontend', 'front end', 'backend', 'back end', 'database', 'media', 'video editing experience', 'web development experience', 'what has he done', 'what work has he done', 'what kind of work does he do', 'what role does he have', 'what is his role'], answer: resumeKnowledge.experience },
  { key: 'awards', terms: ['award', 'awards', 'dean', 'deans list', 'deans lister', 'certificate', 'certificates', 'achievement', 'achievements', 'recognition', 'honor', 'honors', 'academic award', 'what awards did he get', 'what did he accomplish'], answer: resumeKnowledge.awards },
  { key: 'contact', terms: ['contact', 'contact information', 'email', 'e mail', 'phone', 'phone number', 'mobile', 'reach him', 'reach out', 'send a message', 'message him', 'how can i contact him', 'how do i contact him', 'how can i reach him', 'hire him', 'work with him', 'collaborate', 'collaboration'], answer: resumeKnowledge.contact },
  { key: 'interests', terms: ['interest', 'interests', 'what does he like', 'what is he interested in', 'what does he enjoy', 'passion', 'passions', 'hobby', 'hobbies', 'creative interests', 'favorite field'], answer: resumeKnowledge.interests },
  { key: 'navigation', terms: ['website sections', 'navigation bar', 'navigation menu', 'how do i navigate', 'where can i see the videos', 'where can i see the friends', 'where can i see the timeline', 'where can i see the resume', 'where can i see the contact page', 'which tab has the projects'], answer: 'Use the navigation bar to explore Home, Videos, Projects, Friends, Live Timeline, AI Chatbox, Resume, and Contact Me.' },
  { key: 'thanks', terms: ['thank', 'thanks', 'thx', 'appreciate', 'many thanks'], answer: 'You are welcome! I am here whenever you want to explore Christian\'s portfolio.' }
];

const generatedQuestionPatterns = {
  identity: {
    topics: ['Christian', 'this person', 'the creator', 'the developer', 'the designer', 'the student'],
    templates: ['who is {topic}', 'tell me about {topic}', 'what should i know about {topic}', 'can you describe {topic}', 'give me information about {topic}', 'what kind of person is {topic}', 'what is {topic} like', 'can you introduce {topic}', 'give me a short profile of {topic}', 'what is the background of {topic}']
  },
  education: {
    topics: ['education', 'school', 'degree', 'course', 'studies', 'university', 'college', 'academic background', 'IT program', 'graduation'],
    templates: ['what is his {topic}', 'tell me about his {topic}', 'where is his {topic}', 'what do i know about his {topic}', 'can you explain his {topic}', 'what are the details of his {topic}', 'does he have {topic}', 'what kind of {topic} does he have', 'how is his {topic}', 'give me information about his {topic}', 'what did he study for his {topic}', 'is he studying {topic}', 'what questions can i ask about his {topic}']
  },
  skills: {
    topics: ['skills', 'abilities', 'strengths', 'talents', 'expertise', 'technologies', 'programming', 'software', 'tools', 'technical skills', 'creative skills', 'specialization'],
    templates: ['what are his {topic}', 'tell me about his {topic}', 'what is he good at in {topic}', 'what is he great at in {topic}', 'what is he best at in {topic}', 'what can he do with {topic}', 'what does he know about {topic}', 'does he have {topic}', 'what kind of {topic} does he have', 'which {topic} does he have', 'how strong is he in {topic}', 'is he experienced with {topic}', 'is he proficient in {topic}', 'what are his strongest {topic}', 'what is his main {topic}', 'what is he capable of with {topic}', 'what does he specialize in regarding {topic}', 'can he work with {topic}', 'does he use {topic}', 'what {topic} does he use', 'what can he create using {topic}', 'what does he excel at in {topic}']
  },
  projects: {
    topics: ['projects', 'portfolio', 'websites', 'applications', 'bookstore', 'online store', 'database work', 'academic projects', 'software projects'],
    templates: ['what are his {topic}', 'tell me about his {topic}', 'what {topic} has he built', 'what {topic} did he create', 'what {topic} did he make', 'which {topic} are in his portfolio', 'can you describe his {topic}', 'what kind of {topic} does he have', 'has he built any {topic}', 'what is his best {topic}', 'where can i see his {topic}', 'what did he develop for his {topic}', 'what are the details of his {topic}', 'can you explain the {topic}', 'what {topic} show his abilities']
  },
  experience: {
    topics: ['experience', 'work experience', 'professional background', 'web development', 'frontend development', 'backend development', 'database work', 'design work', 'video editing'],
    templates: ['what is his {topic}', 'tell me about his {topic}', 'what kind of {topic} does he have', 'where did he get his {topic}', 'what has he done in {topic}', 'what work has he done in {topic}', 'what roles has he had in {topic}', 'is he experienced in {topic}', 'how much {topic} does he have', 'what does he do in {topic}', 'can you describe his {topic}', 'what are his responsibilities in {topic}', 'what did he learn from {topic}', 'what does his {topic} include']
  },
  awards: {
    topics: ['awards', 'achievements', 'certificates', 'Dean list recognition', 'academic honors', 'accomplishments', 'recognition'],
    templates: ['what are his {topic}', 'tell me about his {topic}', 'what {topic} did he earn', 'which {topic} has he received', 'does he have any {topic}', 'what did he accomplish with his {topic}', 'what academic {topic} does he have', 'can you list his {topic}', 'when did he receive his {topic}', 'what recognition is included in his {topic}']
  },
  contact: {
    topics: ['contact information', 'email', 'phone number', 'contact details', 'message', 'collaboration', 'hiring', 'social links'],
    templates: ['how can i use his {topic}', 'how do i find his {topic}', 'where is his {topic}', 'what is his {topic}', 'how can i reach him through {topic}', 'can i contact him through {topic}', 'how do i send a {topic}', 'how can i ask about {topic}', 'is he available for {topic}', 'how can i work with him through {topic}', 'where can i see his {topic}']
  },
  interests: {
    topics: ['interests', 'passions', 'creative interests', 'hobbies', 'favorite fields', 'things he enjoys'],
    templates: ['what are his {topic}', 'tell me about his {topic}', 'what is he interested in', 'what does he enjoy', 'what does he like doing', 'what creative work does he like', 'what subjects interest him', 'what are his favorite areas', 'what motivates his creative work', 'what does he care about']
  }
};

const extendedQuestionPatterns = {
  identity: {
    topics: ['Christian', 'Christian Villagante', 'the portfolio owner', 'the IT student', 'the web designer', 'the content creator', 'the applicant', 'the person behind this portfolio'],
    templates: ['could you tell me who {topic} is', 'i want to know who {topic} is', 'please describe {topic}', 'what should i know about {topic}', 'what information do you have about {topic}', 'can you summarize {topic}', 'give me an overview of {topic}', 'what is important to know about {topic}', 'what does {topic} do', 'what is {topic} known for', 'what type of professional is {topic}', 'what is the profile of {topic}', 'can you explain the background of {topic}', 'what makes {topic} interesting', 'how would you introduce {topic}', 'what is the short bio of {topic}', 'tell me everything about {topic}', 'who exactly is {topic}', 'what kind of creator is {topic}', 'what kind of developer is {topic}', 'what kind of designer is {topic}', 'what is {topic} currently doing', 'what field is {topic} in', 'what is {topic} studying', 'what does the portfolio say about {topic}', 'what can you tell me about the person named {topic}', 'give me a professional summary of {topic}', 'what is {topic} background', 'what is {topic} profile', 'what does {topic} specialize in']
  },
  education: {
    topics: ['education', 'academic background', 'school', 'university', 'college', 'degree', 'course', 'IT course', 'IT degree', 'studies', 'student status', 'graduation', 'Philippine Christian University'],
    templates: ['can you tell me about his {topic}', 'please explain his {topic}', 'what details are available about his {topic}', 'where can i learn about his {topic}', 'what does his {topic} include', 'what is the latest information about his {topic}', 'how would you describe his {topic}', 'what is his current {topic}', 'what was his {topic}', 'what will happen with his {topic}', 'when did his {topic} begin', 'when is his {topic} expected', 'is his {topic} related to information technology', 'what subject is connected to his {topic}', 'what program is part of his {topic}', 'what university is connected to his {topic}', 'what degree is part of his {topic}', 'what year is he in for his {topic}', 'is he still studying for his {topic}', 'what can you say about his {topic}', 'give me a summary of his {topic}', 'give me more information on his {topic}', 'what questions can i ask regarding his {topic}', 'how far is he in his {topic}', 'what career is his {topic} preparing him for', 'what skills is his {topic} helping him build', 'what is his field of study', 'what is his academic program', 'where is he enrolled', 'when is he expected to graduate', 'is he an undergraduate student', 'what university does he attend']
  },
  skills: {
    topics: ['skills', 'abilities', 'strengths', 'talents', 'expertise', 'technologies', 'programming', 'programming languages', 'software', 'tools', 'technical abilities', 'creative abilities', 'web skills', 'database skills', 'design skills', 'editing skills'],
    templates: ['can you list his {topic}', 'please list his {topic}', 'what are all of his {topic}', 'which {topic} does he have', 'what {topic} does he bring', 'what {topic} can he offer', 'what {topic} has he developed', 'what {topic} has he practiced', 'what {topic} does he use', 'what {topic} is he learning', 'what {topic} does he know', 'what {topic} is he strongest in', 'what {topic} are useful in his work', 'what {topic} are shown in his resume', 'what {topic} are shown in his portfolio', 'how would you rate his {topic}', 'how would you describe his {topic}', 'what are the main parts of his {topic}', 'what are the best examples of his {topic}', 'what are his most useful {topic}', 'what are his professional {topic}', 'what are his personal {topic}', 'what are his practical {topic}', 'what {topic} does he have for web development', 'what {topic} does he have for design', 'what {topic} does he have for databases', 'what {topic} does he have for multimedia', 'what {topic} does he have for programming', 'what {topic} can he use on a project', 'what {topic} can he demonstrate', 'what {topic} would he use at work', 'what {topic} should an employer know', 'what {topic} make him qualified', 'what {topic} make him capable', 'what {topic} show his strengths', 'what {topic} show his experience', 'what {topic} does he excel in', 'what {topic} does he perform well in', 'what {topic} is he familiar with', 'what {topic} has he worked with', 'does he know any {topic}', 'does he use any {topic}', 'can he work with {topic}', 'can he build with {topic}', 'can he design with {topic}', 'can he edit with {topic}', 'can he program with {topic}', 'can he manage {topic}', 'can he create using {topic}', 'what should i ask about his {topic}', 'tell me more about his {topic}']
  },
  projects: {
    topics: ['projects', 'portfolio projects', 'websites', 'web applications', 'software applications', 'online bookstore', 'database project', 'academic projects', 'major projects', 'minor projects', 'digital media projects', 'portfolio work'],
    templates: ['can you list his {topic}', 'what are all of his {topic}', 'which {topic} has he made', 'which {topic} has he built', 'which {topic} has he developed', 'which {topic} has he created', 'what {topic} are shown online', 'what {topic} are in his portfolio', 'what {topic} demonstrate his skills', 'what {topic} demonstrate his experience', 'what is included in his {topic}', 'what is the purpose of his {topic}', 'what problem does his {topic} solve', 'what technologies are used in his {topic}', 'what tools were used for his {topic}', 'what database is related to his {topic}', 'what design work is in his {topic}', 'what can i learn from his {topic}', 'how did he approach his {topic}', 'how did he organize his {topic}', 'how did he build his {topic}', 'how did he design his {topic}', 'how did he develop his {topic}', 'what is his most important {topic}', 'what is his best known {topic}', 'can you explain his {topic}', 'can you summarize his {topic}', 'tell me more about his {topic}', 'where can i view his {topic}', 'where are his {topic} displayed', 'which {topic} are major', 'which {topic} are minor', 'what kind of {topic} has he worked on', 'has he done any {topic}', 'has he completed any {topic}', 'does he have any {topic}', 'what did he make for school', 'what did he make for his portfolio', 'what did he build with a database', 'what did he build for online shopping', 'what did he create for media', 'what website did he develop', 'what application did he develop', 'what database application did he create', 'what bookstore application did he build', 'what software work has he done', 'what portfolio work has he completed', 'what project shows his frontend skills', 'what project shows his backend skills', 'what project shows his design skills', 'what project shows his media skills', 'what project should i view first']
  },
  experience: {
    topics: ['experience', 'work experience', 'professional experience', 'web development experience', 'frontend experience', 'backend experience', 'database experience', 'design experience', 'video editing experience', 'technical background', 'professional background'],
    templates: ['can you describe his {topic}', 'what does his {topic} include', 'what kind of {topic} does he have', 'where does his {topic} come from', 'what has he done in his {topic}', 'what work is part of his {topic}', 'what responsibilities are part of his {topic}', 'what roles are part of his {topic}', 'what tools did he use in his {topic}', 'what skills did he use in his {topic}', 'what did he learn from his {topic}', 'what did he build during his {topic}', 'what did he design during his {topic}', 'what did he develop during his {topic}', 'what did he manage during his {topic}', 'is he experienced in {topic}', 'does he have experience with {topic}', 'how much {topic} does he have', 'what is the strongest part of his {topic}', 'what is the focus of his {topic}', 'what is the scope of his {topic}', 'what examples show his {topic}', 'what projects show his {topic}', 'how does his {topic} help him', 'how does his {topic} relate to his skills', 'what kind of role could use his {topic}', 'what professional work has he done', 'what practical work has he done', 'what development work has he done', 'what design work has he done', 'what database work has he done', 'what media work has he done', 'what is his developer experience', 'what is his designer experience', 'what is his technical experience', 'what is his creative experience', 'what is his application experience', 'what is his website experience', 'what should an employer know about his experience']
  },
  awards: {
    topics: ['awards', 'achievements', 'certificates', 'Dean list recognition', 'academic honors', 'accomplishments', 'recognition', 'qualifications'],
    templates: ['can you list his {topic}', 'what are all of his {topic}', 'what {topic} has he earned', 'what {topic} has he received', 'what {topic} has he achieved', 'when did he receive his {topic}', 'when did he earn his {topic}', 'what school recognition does he have', 'what academic {topic} does he have', 'what honors are in his resume', 'what accomplishments are in his resume', 'what certificates are in his resume', 'can you explain his {topic}', 'can you summarize his {topic}', 'what do his {topic} say about him', 'how do his {topic} show his ability', 'which {topic} are most important', 'does he have academic {topic}', 'does he have professional {topic}', 'what recognition did he get as a student']
  },
  contact: {
    topics: ['contact information', 'email address', 'phone number', 'contact details', 'message', 'collaboration', 'hiring', 'social media', 'social links'],
    templates: ['can you give me his {topic}', 'where can i find his {topic}', 'how can i use his {topic}', 'how can i reach him using his {topic}', 'how can i contact him using his {topic}', 'can i send him a {topic}', 'can i ask him about a {topic}', 'how do i request a {topic}', 'how do i start a {topic}', 'is he open to {topic}', 'is he available for {topic}', 'can i work with him through {topic}', 'what is the best way to use his {topic}', 'where are his {topic} listed', 'how do i find the {topic} section', 'what should i include in a {topic}', 'how can an employer start a {topic}', 'how can a client start a {topic}', 'how can a collaborator start a {topic}', 'can i hire him through his {topic}']
  },
  interests: {
    topics: ['interests', 'passions', 'creative interests', 'hobbies', 'favorite fields', 'things he enjoys', 'areas he likes'],
    templates: ['can you list his {topic}', 'what are all of his {topic}', 'what is he interested in', 'what does he enjoy doing', 'what does he like working on', 'what creative work does he enjoy', 'what fields attract him', 'what subjects does he like', 'what motivates his {topic}', 'how do his {topic} relate to his work', 'what does he care about professionally', 'what does he like learning', 'what does he like creating', 'what does he like designing', 'what does he like editing', 'what does he like programming', 'what are his creative strengths', 'what areas would he like to work in', 'what topics could i discuss with him', 'what are his personal interests']
  }
};

const broadQuestionOpeners = [
  'can you explain',
  'please tell me about',
  'i want to know about',
  'could you give details about',
  'what should i know about',
  'tell me more about',
  'give me an overview of',
  'can you describe',
  'what information is available about',
  'help me understand',
  'what can you say about',
  'i would like information about'
];

const broadQuestionEndings = [
  '',
  ' in his resume',
  ' in his portfolio',
  ' for Christian',
  ' as part of his background',
  ' and how it relates to his work',
  ' including examples',
  ' in simple words'
];

const activityQuestionOpeners = [
  'what does he do',
  'what does Christian do',
  'what work does he do',
  'what does he do for work',
  'what does he do professionally',
  'what does he do in his career',
  'what kind of work does he do',
  'what does he actually do',
  'what does he mainly do',
  'what does he do as a developer',
  'what does he do as a designer',
  'what does he do with technology',
  'what does he do with databases',
  'what does he do with websites',
  'what does he do with video editing',
  'what does he do in frontend development',
  'what does he do in backend development',
  'what does he do in graphic design',
  'what does he do in digital media',
  'what does he do for clients',
  'what does he do at school',
  'what is he doing',
  'what is he working on',
  'what is his work',
  'what is his role'
];

const activityQuestionContexts = [
  'web development',
  'frontend development',
  'backend development',
  'database management',
  'application development',
  'graphic design',
  'photo manipulation',
  'video editing',
  'digital media',
  'content creation',
  'UI UX design',
  'portfolio development'
];

const activityQuestionQualifiers = [
  '', ' exactly', ' generally', ' every day', ' in his work', ' in his portfolio',
  ' in his projects', ' in his field', ' as an IT student', ' as a web designer',
  ' as a video editor', ' as a developer', ' in practical terms', ' in simple words',
  ' professionally', ' technically', ' creatively', ' for his career', ' for employers',
  ' for a project', ' with his skills', ' with his education', ' with his experience',
  ' in the future', ' on this website', ' according to his resume',
  ' according to his portfolio', ' that makes him qualified', ' that shows his abilities',
  ' that relates to his skills'
];

const liveDataQuestionTopics = {
  youtube: [
    'YouTube channel', 'channel name', 'channel statistics', 'subscribers', 'subscriber count',
    'channel views', 'video count', 'uploaded videos', 'latest video', 'newest upload',
    'most popular video', 'top video', 'video views', 'video likes', 'video comments'
  ],
  projectData: [
    'uploaded projects', 'major projects', 'minor projects', 'project titles', 'project descriptions',
    'project categories', 'GitHub repositories', 'live demos', 'major project uploads',
    'minor project uploads', 'projects in the manager', 'published projects', 'portfolio uploads', 'project gallery'
  ]
};

const liveDataQuestionOpeners = [
  'what is', 'what are', 'who has', 'which are', 'which one is', 'can you show',
  'can you list', 'please list', 'tell me about', 'give me details about', 'give me information about',
  'where can i find', 'how many', 'how can i view', 'what information is available',
  'what details are shown', 'what can you tell me about', 'which details belong to',
  'can you check', 'please check'
];

const liveDataQuestionEndings = [
  '', ' right now', ' on this website', ' in the live data', ' from the API', ' from YouTube',
  ' from Firestore', ' in the portfolio', ' in the dashboard', ' in the uploaded data',
  ' according to the channel', ' according to the project manager', ' for Christian',
  ' for KouseiLarsCII', ' in simple words', ' with examples', ' with the latest information',
  ' including names', ' including numbers', ' including titles', ' including descriptions',
  ' including categories', ' including views', ' including likes', ' including comments',
  ' including links', ' that are available', ' that were uploaded', ' that are published',
  ' that are currently visible'
];

const personalQuestionTopics = {
  name: { answerKey: 'name', topics: ['name', 'full name', 'real name', 'Christian\'s name', 'the person\'s name', 'his identity'], stems: ['what is his', 'what is he', 'tell me his', 'can you tell me his', 'please give me his', 'i want to know his', 'do you know his', 'who is the person named', 'how do you spell his', 'what does the resume say his', 'what name is shown for'], endings: ['', ' exactly', ' please', ' in the resume', ' in the portfolio', ' according to his cv', ' even with wrong grammar', ' if i spell it wrong', ' for the full version', ' for the official version'] },
  age: { answerKey: 'age', topics: ['age', 'current age', 'years old', 'birth age', 'how old he is'], stems: ['what is his', 'how old is he', 'what age is he', 'can you tell me his', 'do you know his', 'i want to know his', 'tell me how old', 'how many years old is'], endings: ['', ' now', ' today', ' currently', ' according to the profile', ' according to the resume', ' in simple words', ' if someone asks', ' please', ' exactly'] },
  yearLevel: { answerKey: 'education', topics: ['college year', 'year level', 'school year', 'semester', 'current year', 'student year', 'academic level'], stems: ['what is his', 'which is his current', 'what year is he in for', 'is he in fourth', 'is he already in his fourth', 'what semester is he in for', 'how far is he in his', 'can you tell me his current', 'where is he in his'], endings: ['', ' now', ' currently', ' in college', ' at university', ' this semester', ' first semester', ' according to the resume', ' with correct grammar', ' even if i ask badly'] },
  advisor: { answerKey: 'advisor', topics: ['advisor', 'adviser', 'professor', 'teacher', 'reference', 'academic reference', 'program head', 'supervisor', 'recommender'], stems: ['who is his', 'what is the name of his', 'can you name his', 'tell me about his', 'who can be his', 'who is listed as his', 'who is the professor or', 'who is the person in his', 'what reference is shown for his', 'who advises him as an'], endings: ['', ' at school', ' in the resume', ' in the references', ' for IT', ' for his program', ' according to his cv', ' with contact details', ' if i spell advisor wrong', ' please'] },
  personality: { answerKey: 'personality', topics: ['personality', 'character', 'attitude', 'social personality', 'personal qualities', 'behavior', 'nature', 'temperament'], stems: ['what is his', 'how is his', 'what kind of', 'how would you describe his', 'is he a', 'is he generally', 'can you explain his', 'tell me about his', 'what does he say about his', 'what is he like in terms of'], endings: ['', ' as a person', ' with other people', ' socially', ' according to his own description', ' in simple words', ' if he is shy', ' if he is quiet', ' if he is friendly', ' despite being quiet'] },
  determination: { answerKey: 'determination', topics: ['determination', 'motivation', 'drive', 'purpose', 'biggest role in life', 'life purpose', 'ambition', 'what drives him'], stems: ['what is his', 'what gives him', 'what makes him', 'what motivates', 'what drives', 'what is important to', 'what does he value as his', 'what is the biggest', 'why is he determined about', 'can you explain his'], endings: ['', ' in life', ' in art', ' in making videos', ' in school', ' in his career', ' according to his profile', ' as a creator', ' as a student', ' even when work is difficult'] },
  interests: { answerKey: 'interests', topics: ['interests', 'hobbies', 'passions', 'creative interests', 'things he enjoys', 'fun activities', 'art interests', 'Genshin Impact', 'video making for fun'], stems: ['what are his', 'what does he like', 'what does he enjoy', 'what is he interested in', 'what does he do for fun', 'what are his favorite', 'what creative things does he', 'does he enjoy', 'does he like playing', 'can you tell me about his'], endings: ['', ' outside school', ' in his free time', ' for fun', ' creatively', ' according to his profile', ' like Genshin', ' including video editing', ' including art', ' even if grammar is wrong'] },
  resumeProjects: { answerKey: 'resumeProjects', topics: ['resume projects', 'projects in his cv', 'project names', 'projects listed in the resume', 'three projects', 'projects besides the calculator', 'the other two projects', 'academic projects', 'portfolio projects in the resume'], stems: ['what are his', 'what is the name of his', 'can you list his', 'tell me about his', 'which are the', 'what other', 'what are the two other', 'what projects did he include in his', 'what project names appear in his', 'show me his'], endings: ['', ' exactly', ' according to the resume', ' with the project names', ' besides calculators', ' apart from the calculator', ' including the other two', ' for an interview', ' if i misspell project', ' in simple words'] },
  about: { answerKey: 'summary', topics: ['about him', 'his background', 'his story', 'his profile', 'what he is about', 'the about me section', 'his personal summary'], stems: ['what is he about', 'what is his', 'tell me about', 'can you explain', 'who is he and what is he about', 'what should i know about', 'give me the', 'what does the resume say about', 'what does his about me say about', 'describe'], endings: ['', ' in the resume', ' in the portfolio', ' in simple words', ' as a person', ' as a student', ' as a designer', ' as a creator', ' with correct grammar', ' even if i ask wrongly'] }
};

function addPersonalQuestionCombinations() {
  Object.values(personalQuestionTopics).forEach(topicSet => {
    const intent = aiIntents.find(item => item.key === topicSet.answerKey) || aiIntents.find(item => item.key === 'identity');
    if (!intent) return;
    const combinations = topicSet.topics.flatMap(topic => topicSet.stems.flatMap(stem => topicSet.endings.map(ending => `${stem} ${topic}${ending}`)));
    intent.terms = [...new Set([...intent.terms, ...combinations])];
  });
}

function addLiveDataQuestionCombinations() {
  Object.entries(liveDataQuestionTopics).forEach(([intentKey, topics]) => {
    const intent = aiIntents.find(item => item.key === intentKey);
    if (!intent) return;
    const combinations = topics.flatMap(topic => liveDataQuestionOpeners.flatMap(opener => liveDataQuestionEndings.map(ending => `${opener} his ${topic}${ending}`)));
    intent.terms = [...new Set([...intent.terms, ...combinations])];
  });
}

function getLiveYoutubeAnswer(query) {
  if (/project|major|minor|github|repository|demo/.test(query)) return null;
  const youtubeSignal = /youtube|channel|subscriber|video|upload|views|likes|comments/.test(query);
  if (!youtubeSignal) return null;

  const videos = typeof rawVideos !== 'undefined' ? rawVideos : [];
  const subscriberText = document.getElementById('subCount')?.innerText || 'Subscriber data is still loading.';
  const viewText = document.getElementById('viewCount')?.innerText || 'View data is still loading.';
  const videoCountText = document.getElementById('videoCount')?.innerText || `${videos.length} loaded videos`;

  if (/latest|newest|recent|most recent/.test(query)) {
    const latest = [...videos].sort((first, second) => second.pubDate - first.pubDate)[0];
    return latest ? `The latest loaded upload is “${latest.title}”. It has ${latest.views.toLocaleString()} views, ${latest.likes.toLocaleString()} likes, and ${latest.commentsCount.toLocaleString()} comments.` : 'The latest YouTube video data is still loading.';
  }

  if (/popular|top|best|most viewed|highest/.test(query)) {
    const popular = [...videos].sort((first, second) => second.views - first.views)[0];
    return popular ? `The most-viewed loaded video is “${popular.title}” with ${popular.views.toLocaleString()} views, ${popular.likes.toLocaleString()} likes, and ${popular.commentsCount.toLocaleString()} comments.` : 'Popular video data is still loading.';
  }

  if (/title|names|list|uploads|uploaded videos|videos does he make/.test(query) && videos.length) {
    const titles = videos.slice(0, 5).map((video, index) => `${index + 1}. ${video.title}`).join('\n');
    return `Here are some loaded KouseiLarsCII uploads:\n${titles}`;
  }

  if (/subscriber|views|statistics|stats|how many|count/.test(query)) {
    return `KouseiLarsCII currently shows ${subscriberText}, ${viewText}, and ${videoCountText}. These values come from the loaded YouTube channel data.`;
  }

  return 'The YouTube channel is KouseiLarsCII. I can answer questions about its subscribers, views, video count, uploads, latest video, popular video, likes, comments, and channel content.';
}

function getLiveProjectAnswer(query) {
  const projectSignal = /project|portfolio|major|minor|uploaded|published|github|repository|demo|category|description|title|manager/.test(query);
  if (!projectSignal || typeof cachedProjects === 'undefined' || !cachedProjects.length) return null;

  const category = /minor/.test(query) ? 'minor' : /major/.test(query) ? 'major' : null;
  const projects = cachedProjects.filter(project => !category || (project.category || 'major').toLowerCase() === category);
  if (!projects.length) return `There are no ${category || ''} uploaded projects available in the live project data yet.`.replace('  ', ' ');

  if (/title|name|list|which|what are|show|how many/.test(query)) {
    const projectList = projects.slice(0, 8).map((project, index) => `${index + 1}. ${project.title} (${project.category || 'major'})`).join('\n');
    return `Here are the loaded ${category || 'portfolio'} projects:\n${projectList}`;
  }

  const project = projects[0];
  if (/description|details|explain|about/.test(query)) {
    return `The project “${project.title}” is described as: ${project.description || 'No description is available yet.'}`;
  }

  return `I found ${projects.length} loaded ${category || 'portfolio'} project${projects.length === 1 ? '' : 's'}. The first one is “${project.title}”.`;
}

function addActivityQuestionCombinations() {
  const experienceIntent = aiIntents.find(intent => intent.key === 'experience');
  if (!experienceIntent) return;

  const activityTerms = activityQuestionOpeners.flatMap(opener => [
    opener,
    ...activityQuestionContexts.flatMap(context => activityQuestionQualifiers.map(qualifier => `${opener} in ${context}${qualifier}`))
  ]);
  experienceIntent.terms = [...new Set([...experienceIntent.terms, ...activityTerms])];
}

function addBroadQuestionCombinations() {
  const expandableIntentKeys = new Set(['education', 'skills', 'projects', 'experience', 'awards', 'contact', 'interests']);
  aiIntents.forEach(intent => {
    if (!expandableIntentKeys.has(intent.key)) return;
    const patternSet = extendedQuestionPatterns[intent.key];
    const combinations = patternSet.topics.flatMap(topic => broadQuestionOpeners.flatMap(opener => broadQuestionEndings.map(ending => `${opener} ${topic}${ending}`)));
    intent.terms = [...new Set([...intent.terms, ...combinations])];
  });
}

function addGeneratedQuestionPatterns() {
  aiIntents.forEach(intent => {
    const patternSet = generatedQuestionPatterns[intent.key];
    const extendedSet = extendedQuestionPatterns[intent.key];
    const patternSets = [patternSet, extendedSet].filter(Boolean);
    if (!patternSets.length) return;

    const generatedTerms = patternSets.flatMap(set => set.topics.flatMap(topic => set.templates.map(template => template.replace('{topic}', topic))));
    intent.terms = [...new Set([...intent.terms, ...generatedTerms])];
  });
}

addGeneratedQuestionPatterns();
addBroadQuestionCombinations();
addActivityQuestionCombinations();
addLiveDataQuestionCombinations();
addPersonalQuestionCombinations();

const typoMap = {
  skil: 'skill', skils: 'skills', skilses: 'skills', projct: 'project', projcts: 'projects', prject: 'project', proejct: 'project', porfolio: 'portfolio', portfoloi: 'portfolio', websiite: 'website', websiites: 'websites', bulit: 'built', bult: 'built',
  educaton: 'education', eduction: 'education', experince: 'experience', experiance: 'experience',
  contat: 'contact', contct: 'contact', emal: 'email', adress: 'address', abot: 'about',
  christan: 'christian', chrisitan: 'christian', desiner: 'designer', develper: 'developer',
  progrming: 'programming', javscript: 'javascript', pythn: 'python', databse: 'database',
  awrd: 'award', cerificate: 'certificate', resum: 'resume', phon: 'phone',
  qulification: 'qualification', qulified: 'qualified', achievment: 'achievement',
  tecnology: 'technology', techonology: 'technology', developement: 'development',
  responsve: 'responsive', desgin: 'design', creatve: 'creative', collab: 'collaborate',
  collboration: 'collaboration', hireing: 'hire', intersted: 'interest', studing: 'study',
  determinination: 'determination', determinaton: 'determination', persnality: 'personality',
  proffesor: 'professor', profesr: 'professor', advsior: 'advisor', advisr: 'advisor',
  calcultor: 'calculator', calculatr: 'calculator', calulator: 'calculator'
};

const synonymMap = {
  abilities: 'skills', ability: 'skills', capability: 'skills', capabilities: 'skills', strengths: 'skills',
  strong: 'skills', talented: 'skills', talent: 'skills', expertise: 'skills', specialty: 'skills',
  specializations: 'skills', websites: 'website', knowhow: 'skills', stack: 'technology', tech: 'technology', coding: 'programming',
  academics: 'education', background: 'experience', career: 'experience', history: 'experience',
  creations: 'projects', apps: 'application', accomplishments: 'awards',
  prizes: 'awards', certificates: 'certificate', qualifications: 'education',
  connect: 'contact', reachout: 'contact', hire: 'contact', availability: 'contact',
  bio: 'identity', profile: 'identity', passions: 'interests', hobbies: 'interests'
};

const ignoredWords = new Set(['a', 'an', 'the', 'is', 'are', 'was', 'were', 'do', 'does', 'did', 'can', 'could', 'would', 'will', 'you', 'he', 'his', 'him', 'i', 'me', 'my', 'about', 'please', 'tell', 'show', 'give', 'what', 'which', 'where', 'how', 'why', 'when', 'and', 'or', 'to', 'of', 'for', 'in', 'on', 'with']);

let lastAiIntentKey = null;

function normalizeAiText(value) {
  return value
    .toLowerCase()
    .replace(/what\s+(?:is|are)\s+(?:he|christian)\s+(?:great|good|best)\s+(?:of|at|in)\s+what/g, 'what are his strengths')
    .replace(/what\s+(?:he|christian)\s+(?:great|good|best)\s+(?:of|at|in)/g, 'what are his strengths')
    .replace(/what\s+does\s+(?:he|christian)\s+know/g, 'what are his skills')
    .replace(/what\s+is\s+his\s+strongest\s+point/g, 'what are his strengths')
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(Boolean)
    .map(word => typoMap[word] || synonymMap[word] || word)
    .join(' ');
}

function stemWord(word) {
  if (word.length > 6 && word.endsWith('ies')) return `${word.slice(0, -3)}y`;
  if (word.length > 5 && word.endsWith('ing')) return word.slice(0, -3);
  if (word.length > 4 && word.endsWith('ed')) return word.slice(0, -2);
  if (word.length > 4 && word.endsWith('es')) return word.slice(0, -2);
  if (word.length > 4 && word.endsWith('s')) return word.slice(0, -1);
  return word;
}

function getAiTokens(value) {
  return normalizeAiText(value)
    .split(' ')
    .map(stemWord)
    .filter(word => word.length > 1 && !ignoredWords.has(word));
}

function containsAiPhrase(query, phrase) {
  const queryWords = normalizeAiText(query).split(' ');
  const phraseWords = normalizeAiText(phrase).split(' ');
  if (phraseWords.length > queryWords.length) return false;
  return phraseWords.every((word, index) => queryWords[index] === word)
    || queryWords.some((_, index) => phraseWords.every((word, phraseIndex) => queryWords[index + phraseIndex] === word));
}

function levenshteinDistance(first, second) {
  const row = Array.from({ length: second.length + 1 }, (_, index) => index);
  for (let firstIndex = 1; firstIndex <= first.length; firstIndex += 1) {
    let diagonal = row[0];
    row[0] = firstIndex;
    for (let secondIndex = 1; secondIndex <= second.length; secondIndex += 1) {
      const previous = row[secondIndex];
      row[secondIndex] = first[firstIndex - 1] === second[secondIndex - 1]
        ? diagonal
        : Math.min(row[secondIndex] + 1, row[secondIndex - 1] + 1, diagonal + 1);
      diagonal = previous;
    }
  }
  return row[second.length];
}

function intentScore(query, intent) {
  const normalizedQuery = normalizeAiText(query);
  const queryWords = getAiTokens(normalizedQuery);
  const score = intent.terms.reduce((bestScore, term) => {
    const normalizedTerm = normalizeAiText(term);
    if (containsAiPhrase(normalizedQuery, normalizedTerm)) return Math.max(bestScore, 1);
    const termWords = getAiTokens(normalizedTerm);
    const matchedWords = termWords.filter(termWord => queryWords.some(queryWord => {
      if (queryWord === termWord) return true;
      if (queryWord.length < 4 || termWord.length < 4) return false;
      return levenshteinDistance(queryWord, termWord) <= (termWord.length > 6 ? 2 : 1);
    }));
    const coverageScore = termWords.length ? matchedWords.length / termWords.length : 0;
    const queryCoverage = queryWords.length ? matchedWords.length / queryWords.length : 0;
    return Math.max(bestScore, coverageScore * 0.86 + queryCoverage * 0.14);
  }, 0);

  const canonicalBoosts = {
    education: ['education', 'university', 'school', 'degree', 'study'],
    projects: ['project', 'portfolio', 'bookstore', 'application'],
    skills: ['skill', 'technology', 'programming', 'software', 'strength'],
    experience: ['experience', 'developer', 'designer', 'frontend', 'backend'],
    awards: ['award', 'certificate', 'achievement'],
    contact: ['contact', 'email', 'phone', 'reach'],
    interests: ['interest', 'passion', 'hobby']
  };
  const boostTerms = canonicalBoosts[intent.key] || [];
  const explicitBoost = boostTerms.some(term => getAiTokens(normalizedQuery).includes(term)) ? 0.2 : 0;
  return Math.min(1, score + explicitBoost);
}

function getPersonalFactAnswer(query) {
  if (/\b(name|naem|called|spell)\b/.test(query) && !/channel|project|advisor/.test(query)) return resumeKnowledge.name;
  if (/\b(age|old|years old)\b/.test(query)) return resumeKnowledge.age;
  if (/\b(what year|year level|fourth year|4th year|semester|college year|student year)\b/.test(query)) return resumeKnowledge.education;
  if (/\b(advisor|adviser|professor|prof|teacher|instructor|reference|program head|supervisor)\b/.test(query)) return resumeKnowledge.advisor;
  if (/\b(personality|character|quiet|shy|good person|social)\b/.test(query)) return resumeKnowledge.personality;
  if (/\b(biggest role|life role|purpose in life|what drives|motivation|determination|determined)\b/.test(query)) return `${resumeKnowledge.lifeRole} ${resumeKnowledge.determination}`;
  if (/\b(genshin|art|artistic|artistry|artist|for fun|hobbies|hobby|interests|passion|enjoy)\b/.test(query)) return resumeKnowledge.interests;
  if (/\b(what is he about|what is his background|about me|about him|his story|personal summary)\b/.test(query)) return resumeKnowledge.summary;
  if (/\b(first|1st|one)\b.*\b(project|resume)\b|\b(project|resume)\b.*\b(first|1st|one)\b/.test(query)) return resumeKnowledge.resumeProjectDetails.first;
  if (/\b(second|2nd|two)\b.*\b(project|resume)\b|\b(project|resume)\b.*\b(second|2nd|two)\b/.test(query)) return resumeKnowledge.resumeProjectDetails.second;
  if (/\b(third|3rd|three)\b.*\b(project|resume)\b|\b(project|resume)\b.*\b(third|3rd|three)\b/.test(query)) return resumeKnowledge.resumeProjectDetails.third;
  if (/\b(resume projects|projects in (his )?(resume|cv)|project names|three projects|besides (the )?calculator|other two projects|projects listed)\b/.test(query)) return resumeKnowledge.resumeProjects;
  if (/\b(project|projects)\b.*\b(in|on|from)\b.*\b(resume|cv)\b.*\b(detail|information|about)\b/.test(query)) return resumeKnowledge.resumeProjects;
  if (/\b(why|how)\b.*\b(great|good|strong|excellent)\b.*\b(youtube|video|editing|edit)/.test(query)) {
    return 'He is strong at YouTube video creation and editing because he combines creative art skills with practical editing tools and a good understanding of visual storytelling. He uses Premiere Pro, DaVinci Resolve, CapCut, Photoshop, and related multimedia workflows.';
  }
  if (/\b(great|good|best|excellent|proficient|capable)\b.*\b(html|css|javascript|video|editing|youtube|design)/.test(query) || /\b(html|css|javascript|video editing|editing)\b.*\b(great|good|best|excellent|proficient|capable)/.test(query)) {
    return 'Yes. Christian is strong at HTML and frontend work, and he is also talented in video editing and creative production. He has practical experience using HTML5, CSS3, JavaScript, Adobe Premiere Pro, DaVinci Resolve, CapCut, and Photoshop.';
  }
  return null;
}

function getBotResponse(input) {
  const normalizedQuery = normalizeAiText(input);
  const queryTokens = getAiTokens(normalizedQuery);
  const followUp = /\b(more|detail|details|explain|elaborate|that|this|it|also|else)\b/.test(normalizedQuery);

  if (/\b(how about|what about)\b.*\b(resume|cv|academic experience)\b/.test(normalizedQuery)
    || (/\b(in the resume|on the resume|resume version|cv version|academic experience)\b/.test(normalizedQuery)
      && ['projectData', 'projects', 'resumeProjects'].includes(lastAiIntentKey))) {
    lastAiIntentKey = 'resumeProjects';
    return resumeKnowledge.resumeProjects;
  }

  const personalFactAnswer = getPersonalFactAnswer(normalizedQuery);
  if (personalFactAnswer) {
    if (/project|resume|cv|calculator/.test(normalizedQuery)) lastAiIntentKey = 'resumeProjects';
    else if (/advisor|professor|reference|teacher/.test(normalizedQuery)) lastAiIntentKey = 'advisor';
    else if (/personality|quiet|shy/.test(normalizedQuery)) lastAiIntentKey = 'personality';
    else if (/determination|motivation|role in life|drives/.test(normalizedQuery)) lastAiIntentKey = 'determination';
    else if (/art|genshin|hobby|interest|enjoy/.test(normalizedQuery)) lastAiIntentKey = 'interests';
    else lastAiIntentKey = 'identity';
    return personalFactAnswer;
  }

  if (/\b(project|projects)\b/.test(normalizedQuery) && /\b(resume|cv|academic experience)\b/.test(normalizedQuery)) {
    lastAiIntentKey = 'resumeProjects';
    return resumeKnowledge.resumeProjects;
  }

  const liveYoutubeAnswer = getLiveYoutubeAnswer(normalizedQuery);
  if (liveYoutubeAnswer) {
    lastAiIntentKey = 'youtube';
    return liveYoutubeAnswer;
  }

  const liveProjectAnswer = getLiveProjectAnswer(normalizedQuery);
  if (liveProjectAnswer) {
    lastAiIntentKey = 'projectData';
    return liveProjectAnswer;
  }

  if (/\b(good|great|best|strong|strongest|talent|talented|excellent|proficient|capable)\b/.test(normalizedQuery)) {
    lastAiIntentKey = 'skills';
    return resumeKnowledge.skills;
  }

  if (/\bwhat\s+(?:does|did)\s+(?:he|christian)\s+(?:do|work|have)\b|\bwhat\s+he\s+do\b|\bwhat\s+is\s+his\s+role\b|\bwhat\s+is\s+he\s+doing\b|\bwhat\s+kind\s+of\s+work\s+does\s+he\s+do\b/.test(normalizedQuery)) {
    lastAiIntentKey = 'experience';
    return resumeKnowledge.experience;
  }

  if (queryTokens.includes('project') && !queryTokens.some(token => ['skill', 'technology', 'programming', 'software'].includes(token))) {
    lastAiIntentKey = 'projects';
    return resumeKnowledge.projects;
  }

  if (queryTokens.some(token => ['bookstore', 'application', 'portfolio'].includes(token)) && !queryTokens.some(token => ['skill', 'technology', 'programming', 'software'].includes(token))) {
    lastAiIntentKey = 'projects';
    return resumeKnowledge.projects;
  }

  if ((queryTokens.includes('website') || queryTokens.includes('websites')) && queryTokens.some(token => ['build', 'built', 'create', 'created', 'make', 'made'].includes(token))) {
    lastAiIntentKey = 'projects';
    return resumeKnowledge.projects;
  }

  if (queryTokens.some(token => ['education', 'school', 'university', 'degree', 'study', 'academic'].includes(token))) {
    lastAiIntentKey = 'education';
    return resumeKnowledge.education;
  }

  if (queryTokens.some(token => ['contact', 'email', 'phone', 'reach', 'collaborate'].includes(token)) && !queryTokens.some(token => ['skill', 'project', 'education', 'study'].includes(token))) {
    lastAiIntentKey = 'contact';
    return resumeKnowledge.contact;
  }

  if (/what can i ask|what should i ask|possible question|question example|what do you know|show me topic|qword|keyword/.test(normalizedQuery)) {
    lastAiIntentKey = 'help';
    return aiIntents.find(intent => intent.key === 'help').answer;
  }

  if (followUp && lastAiIntentKey && getAiTokens(normalizedQuery).length <= 2) {
    const previousIntent = aiIntents.find(intent => intent.key === lastAiIntentKey);
    if (previousIntent) return `Here is more about that: ${previousIntent.answer}`;
  }

  const rankedIntents = aiIntents
    .map(intent => ({ intent, score: intentScore(normalizedQuery, intent) }))
    .sort((first, second) => second.score - first.score);
  const asksForHelpTopics = /what can i ask|what should i ask|possible question|question example|what do you know|show me topic|qword|keyword/.test(normalizedQuery);
  const strongMatches = rankedIntents
    .filter(match => match.score >= 0.42 && (match.intent.key !== 'help' || asksForHelpTopics))
    .slice(0, 2);
  const bestMatch = strongMatches[0] || rankedIntents[0];

  if (followUp && lastAiIntentKey) {
    const previousIntent = aiIntents.find(intent => intent.key === lastAiIntentKey);
    if (previousIntent && !strongMatches.length) return `Here is more about that: ${previousIntent.answer}`;
  }

  if (bestMatch && bestMatch.score >= 0.42) {
    lastAiIntentKey = bestMatch.intent.key;
    return bestMatch.intent.answer;
  }
  if (normalizedQuery.includes('resume') || normalizedQuery.includes('cv')) {
    lastAiIntentKey = 'identity';
    return `${resumeKnowledge.summary} ${resumeKnowledge.experience} You can open the Resume tab for the complete CV.`;
  }
  if (followUp && lastAiIntentKey) {
    const previousIntent = aiIntents.find(intent => intent.key === lastAiIntentKey);
    if (previousIntent) return `I can expand on that: ${previousIntent.answer}`;
  }
  return 'I can help with Christian\'s education, skills, projects, experience, awards, interests, contact information, and portfolio navigation. Try asking, “what skills does he have?” or “tell me about his projects.”';
}

function getCurrentTime() {
  return new Intl.DateTimeFormat([], { hour: 'numeric', minute: '2-digit' }).format(new Date());
}

function appendMessage(message, type, targetId = 'aiChatMessages') {
  const messagesContainer = document.getElementById(targetId);
  if (!messagesContainer) return;
  const row = document.createElement('div');
  row.className = `ai-message-row ${type}-row`;

  if (type === 'bot') {
    const avatar = document.createElement('img');
    avatar.className = 'message-avatar';
    avatar.src = aiProfileImage;
    avatar.alt = 'Kousei AI';
    row.appendChild(avatar);
  }

  const bubble = document.createElement('div');
  bubble.className = `ai-message ${type}`;
  if (type === 'bot') {
    const author = document.createElement('span');
    author.className = 'message-author';
    author.textContent = 'Kousei AI';
    bubble.appendChild(author);
  }
  bubble.appendChild(document.createTextNode(message));
  const time = document.createElement('span');
  time.className = 'message-time';
  time.textContent = getCurrentTime();
  bubble.appendChild(time);
  row.appendChild(bubble);
  messagesContainer.appendChild(row);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
  const createdAt = new Date().toISOString();
  aiSessionMessages.push({ message, type, createdAt });
  saveAiChatSession();
}

function showTypingIndicator(targetId = 'aiChatMessages') {
  const messagesContainer = document.getElementById(targetId);
  if (!messagesContainer) return;
  const row = document.createElement('div');
  row.className = 'ai-message-row bot-row';
  row.id = `${targetId}TypingIndicator`;
  row.innerHTML = `<img src="${aiProfileImage}" alt="Kousei AI" class="message-avatar"><div class="ai-message bot ai-typing"><span></span><span></span><span></span></div>`;
  messagesContainer.appendChild(row);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function removeTypingIndicator(targetId = 'aiChatMessages') {
  document.getElementById(`${targetId}TypingIndicator`)?.remove();
}

function sendAiMessage(inputId = 'aiChatInput', targetId = 'aiChatMessages') {
  const inputField = document.getElementById(inputId);
  if (!inputField) return;
  if (aiAvailability !== 'online') {
    appendMessage('AI chat is currently offline. Please try again later.', 'bot', targetId);
    inputField.value = '';
    return;
  }
  const query = inputField.value.trim();
  if (!query) return;

  appendMessage(query, 'user');
  if (aiSessionTitle === 'New AI conversation') aiSessionTitle = query.slice(0, 72);
  inputField.value = '';
  inputField.focus();
  showTypingIndicator(targetId);

  window.setTimeout(() => {
    removeTypingIndicator(targetId);
    appendMessage(getBotResponse(query), 'bot', targetId);
  }, 450);
}

function askAiPrompt(prompt, inputId = 'aiChatInput', targetId = 'aiChatMessages') {
  const inputField = document.getElementById(inputId);
  if (!inputField) return;
  inputField.value = prompt;
  sendAiMessage(inputId, targetId);
}

function formatAiDate(value) {
  const date = value instanceof Date ? value : new Date(value);
  return Number.isNaN(date.getTime()) ? 'Unknown date' : new Intl.DateTimeFormat([], { dateStyle: 'medium', timeStyle: 'short' }).format(date);
}

function getAiSessionRef(id = aiSessionId) {
  return typeof db !== 'undefined' ? db.collection('ai_chat_sessions').doc(id) : null;
}

function saveAiChatSession() {
  const ref = getAiSessionRef();
  if (!ref || !aiSessionMessages.length) return;
  const hasUserMessage = aiSessionMessages.some(item => item.type === 'user' && item.message.trim());
  const ids = JSON.parse(localStorage.getItem(aiHistoryStorageKey) || '[]');

  if (!hasUserMessage) {
    ref.delete().catch(error => console.warn('Empty AI chat session could not be removed:', error));
    localStorage.setItem(aiHistoryStorageKey, JSON.stringify(ids.filter(id => id !== aiSessionId)));
    return;
  }

  const payload = {
    sessionId: aiSessionId,
    title: aiSessionTitle,
    messages: aiSessionMessages,
    updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    createdAt: aiSessionMessages[0].createdAt
  };
  ref.set(payload, { merge: true }).catch(error => console.warn('AI chat history could not be saved:', error));
  if (!ids.includes(aiSessionId)) {
    ids.unshift(aiSessionId);
    localStorage.setItem(aiHistoryStorageKey, JSON.stringify(ids.slice(0, 40)));
  }
}

function clearAiChatMessages() {
  const container = document.getElementById('aiChatMessages');
  if (!container) return;
  container.innerHTML = '';
  aiSessionMessages = [];
  aiSessionTitle = 'New AI conversation';
  lastAiIntentKey = null;
}

function startNewAiChat() {
  saveAiChatSession();
  clearAiChatMessages();
  aiSessionId = `session_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
  localStorage.setItem(aiSessionStorageKey, aiSessionId);
  aiSessionMessages = [];
  aiSessionTitle = 'New AI conversation';
  appendMessage('Hello! I am Kousei AI. What would you like to know about Christian?', 'bot');
  saveAiChatSession();
}

async function loadAiChatSession(id) {
  const ref = getAiSessionRef(id);
  if (!ref) return;
  const snapshot = await ref.get();
  if (!snapshot.exists) return;
  const data = snapshot.data();
  aiSessionId = id;
  localStorage.setItem(aiSessionStorageKey, id);
  aiSessionTitle = data.title || 'Restored AI conversation';
  aiSessionMessages = [];
  const container = document.getElementById('aiChatMessages');
  if (!container) return;
  container.innerHTML = '';
  (data.messages || []).forEach(item => {
    appendRestoredMessage(item.message, item.type, item.createdAt);
  });
  aiSessionReady = true;
  toggleAiChatHistory(false);
}

function appendRestoredMessage(message, type, createdAt) {
  const container = document.getElementById('aiChatMessages');
  const row = document.createElement('div');
  row.className = `ai-message-row ${type}-row`;
  if (type === 'bot') {
    const avatar = document.createElement('img');
    avatar.className = 'message-avatar'; avatar.src = aiProfileImage; avatar.alt = 'Kousei AI'; row.appendChild(avatar);
  }
  const bubble = document.createElement('div');
  bubble.className = `ai-message ${type}`;
  if (type === 'bot') {
    const author = document.createElement('span'); author.className = 'message-author'; author.textContent = 'Kousei AI'; bubble.appendChild(author);
  }
  bubble.appendChild(document.createTextNode(message));
  const time = document.createElement('span'); time.className = 'message-time'; time.textContent = formatAiDate(createdAt); bubble.appendChild(time);
  row.appendChild(bubble); container.appendChild(row);
  aiSessionMessages.push({ message, type, createdAt });
  container.scrollTop = container.scrollHeight;
}

async function toggleAiChatHistory(force) {
  const panel = document.getElementById('aiChatHistory');
  const list = document.getElementById('aiChatHistoryList');
  if (!panel || !list) return;
  const shouldOpen = typeof force === 'boolean' ? force : panel.hidden;
  panel.hidden = !shouldOpen;
  if (!shouldOpen) return;
  list.innerHTML = '<p>Loading history…</p>';
  const ids = JSON.parse(localStorage.getItem(aiHistoryStorageKey) || '[]');
  const sessions = [];
  for (const id of ids) {
    try {
      const ref = getAiSessionRef(id);
      const snap = await ref?.get();
      if (!snap?.exists) continue;
      const data = snap.data();
      if (!(data.messages || []).some(item => item.type === 'user' && item.message?.trim())) {
        await ref.delete();
        continue;
      }
      sessions.push({ id, ...data });
    } catch (error) { console.warn(error); }
  }
  list.innerHTML = sessions.length ? sessions.map(session => `<div class="ai-history-item" onclick="loadAiChatSession('${session.id}')"><strong>${escapeAiText(session.title || 'AI conversation')}</strong><span>${formatAiDate(session.updatedAt?.toDate ? session.updatedAt.toDate() : session.updatedAt || session.createdAt)}</span></div>`).join('') : '<p>No saved conversations yet.</p>';
}

function escapeAiText(value) { return String(value || '').replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char])); }

function openFloatingAiChat() {
  const panel = document.getElementById('floatingAiPanel');
  if (!panel) return;
  panel.hidden = false;
  positionFloatingAiPanel();
  renderFloatingAiMessages();
  document.getElementById('floatingAiInput')?.focus();
}

function updateAiAvailabilityUI() {
  document.querySelectorAll('.ai-online-dot').forEach(dot => {
    dot.classList.toggle('ai-status-online', aiAvailability === 'online');
    dot.classList.toggle('ai-status-offline', aiAvailability !== 'online');
  });
  document.querySelectorAll('[data-ai-availability]').forEach(element => {
    element.textContent = aiAvailability === 'online' ? 'Online · AI chat assistant' : 'Offline · AI chat unavailable';
    element.classList.toggle('ai-status-online', aiAvailability === 'online');
    element.classList.toggle('ai-status-offline', aiAvailability !== 'online');
  });
  document.querySelectorAll('[data-ai-chat-input], #aiChatInput, #floatingAiInput').forEach(input => {
    input.disabled = aiAvailability !== 'online';
    input.placeholder = aiAvailability === 'online' ? 'Ask Kousei AI...' : 'AI chat is offline';
  });
  document.querySelectorAll('[data-ai-send], .ai-send-btn, .floating-ai-panel-input button').forEach(button => { button.disabled = aiAvailability !== 'online'; });
}

function initAiAvailabilityListener() {
  if (typeof db === 'undefined') return;
  db.collection('site_control').doc('ai_status').onSnapshot(snapshot => {
    aiAvailability = snapshot.exists && snapshot.data().status === 'offline' ? 'offline' : 'online';
    updateAiAvailabilityUI();
  }, error => console.warn('AI availability status could not load:', error));
}

function closeFloatingAiChat() {
  const panel = document.getElementById('floatingAiPanel');
  if (panel) panel.hidden = true;
}

function renderFloatingAiMessages() {
  const container = document.getElementById('floatingAiMessages');
  if (!container) return;
  container.innerHTML = '';
  const messages = aiSessionMessages.length ? aiSessionMessages : [{ message: 'Hello! Ask me anything about Christian.', type: 'bot', createdAt: new Date().toISOString() }];
  messages.forEach(item => appendRestoredMessageTo(item.message, item.type, item.createdAt, 'floatingAiMessages'));
}

function appendRestoredMessageTo(message, type, createdAt, targetId) {
  const container = document.getElementById(targetId);
  if (!container) return;
  const row = document.createElement('div');
  row.className = `ai-message-row ${type}-row`;
  if (type === 'bot') {
    const avatar = document.createElement('img');
    avatar.className = 'message-avatar'; avatar.src = aiProfileImage; avatar.alt = 'Kousei AI'; row.appendChild(avatar);
  }
  const bubble = document.createElement('div');
  bubble.className = `ai-message ${type}`;
  if (type === 'bot') {
    const author = document.createElement('span'); author.className = 'message-author'; author.textContent = 'Kousei AI'; bubble.appendChild(author);
  }
  bubble.appendChild(document.createTextNode(message));
  const time = document.createElement('span'); time.className = 'message-time'; time.textContent = formatAiDate(createdAt); bubble.appendChild(time);
  row.appendChild(bubble); container.appendChild(row);
  container.scrollTop = container.scrollHeight;
}

function sendFloatingAiMessage() {
  sendAiMessage('floatingAiInput', 'floatingAiMessages');
}

function startFloatingNewAiChat() {
  startNewAiChat();
  renderFloatingAiMessages();
}

async function toggleFloatingAiHistory(force) {
  const panel = document.getElementById('floatingAiHistory');
  const list = document.getElementById('floatingAiHistoryList');
  if (!panel || !list) return;
  const shouldOpen = typeof force === 'boolean' ? force : panel.hidden;
  panel.hidden = !shouldOpen;
  if (!shouldOpen) return;

  list.innerHTML = '<p>Loading history...</p>';
  const ids = JSON.parse(localStorage.getItem(aiHistoryStorageKey) || '[]');
  const sessions = [];
  for (const id of ids) {
    try {
      const ref = getAiSessionRef(id);
      const snapshot = await ref?.get();
      if (!snapshot?.exists) continue;
      const data = snapshot.data();
      if (!(data.messages || []).some(item => item.type === 'user' && item.message?.trim())) continue;
      sessions.push({ id, ...data });
    } catch (error) {
      console.warn('Mini AI history could not load:', error);
    }
  }

  list.innerHTML = sessions.length
    ? sessions.map(session => `<button type="button" class="floating-ai-history-item" onclick="loadFloatingAiChatSession('${escapeAiText(session.id)}')"><strong>${escapeAiText(session.title || 'AI conversation')}</strong><span>${formatAiDate(session.updatedAt?.toDate ? session.updatedAt.toDate() : session.updatedAt || session.createdAt)}</span></button>`).join('')
    : '<p>No saved conversations yet.</p>';
}

async function loadFloatingAiChatSession(id) {
  const ref = getAiSessionRef(id);
  if (!ref) return;
  try {
    const snapshot = await ref.get();
    if (!snapshot.exists) return;
    const data = snapshot.data();
    aiSessionId = id;
    localStorage.setItem(aiSessionStorageKey, id);
    aiSessionTitle = data.title || 'Restored AI conversation';
    aiSessionMessages = data.messages || [];
    renderFloatingAiMessages();
    toggleFloatingAiHistory(false);
  } catch (error) {
    console.warn('Mini AI conversation could not load:', error);
  }
}

function openFullAiChatPage() {
  const navItem = [...document.querySelectorAll('.nav-item')].find(item => item.textContent.trim() === 'AI Chatbox');
  if (navItem) navItem.click();
  closeFloatingAiChat();
}

function positionFloatingAiPanel() {
  const launcher = document.getElementById('floatingAiLauncher');
  const panel = document.getElementById('floatingAiPanel');
  if (!launcher || !panel || panel.hidden) return;

  const launcherRect = launcher.getBoundingClientRect();
  const gap = 12;
  const panelWidth = panel.offsetWidth;
  const panelHeight = panel.offsetHeight;
  const left = Math.max(8, Math.min(window.innerWidth - panelWidth - 8, launcherRect.left + launcherRect.width - panelWidth));
  const canFitAbove = launcherRect.top >= panelHeight + gap;
  const top = canFitAbove
    ? launcherRect.top - panelHeight - gap
    : Math.min(window.innerHeight - panelHeight - 8, launcherRect.bottom + gap);

  panel.style.left = `${left}px`;
  panel.style.top = `${Math.max(8, top)}px`;
  panel.style.right = 'auto';
  panel.style.bottom = 'auto';
}

function moveFloatingAiPanel(left, top) {
  const panel = document.getElementById('floatingAiPanel');
  const launcher = document.getElementById('floatingAiLauncher');
  if (!panel || !launcher) return;
  const panelLeft = Math.max(8, Math.min(window.innerWidth - panel.offsetWidth - 8, left));
  const panelTop = Math.max(8, Math.min(window.innerHeight - panel.offsetHeight - 8, top));
  panel.style.left = `${panelLeft}px`;
  panel.style.top = `${panelTop}px`;
  panel.style.right = 'auto';
  panel.style.bottom = 'auto';

  const launcherLeft = Math.max(8, Math.min(window.innerWidth - launcher.offsetWidth - 8, panelLeft + panel.offsetWidth - launcher.offsetWidth));
  const launcherTop = panelTop + panel.offsetHeight + 12 <= window.innerHeight - launcher.offsetHeight - 8
    ? panelTop + panel.offsetHeight + 12
    : Math.max(8, panelTop - launcher.offsetHeight - 12);
  launcher.style.left = `${launcherLeft}px`;
  launcher.style.top = `${launcherTop}px`;
  launcher.style.right = 'auto';
  launcher.style.bottom = 'auto';
}

function initFloatingAiAssistant() {
  const launcher = document.getElementById('floatingAiLauncher');
  if (!launcher) return;
  const update = () => document.body.classList.toggle('ai-page-active', !!document.querySelector('#page-aichatbox.active-page'));
  new MutationObserver(update).observe(document.body, { subtree: true, attributes: true, attributeFilter: ['class'] });
  update();
  let dragging = false, offsetX = 0, offsetY = 0;
  launcher.addEventListener('pointerdown', event => { dragging = true; offsetX = event.clientX - launcher.getBoundingClientRect().left; offsetY = event.clientY - launcher.getBoundingClientRect().top; launcher.setPointerCapture(event.pointerId); });
  launcher.addEventListener('pointermove', event => { if (!dragging) return; launcher.style.left = `${Math.max(8, Math.min(window.innerWidth - launcher.offsetWidth - 8, event.clientX - offsetX))}px`; launcher.style.top = `${Math.max(8, Math.min(window.innerHeight - launcher.offsetHeight - 8, event.clientY - offsetY))}px`; launcher.style.right = 'auto'; launcher.style.bottom = 'auto'; });
  launcher.addEventListener('pointermove', () => { if (dragging) positionFloatingAiPanel(); });
  launcher.addEventListener('pointerup', () => { dragging = false; });
  const panel = document.getElementById('floatingAiPanel');
  if (panel) {
    let panelDragging = false;
    let panelOffsetX = 0;
    let panelOffsetY = 0;
    panel.addEventListener('pointerdown', event => {
      if (event.target.closest('button, input, textarea, select, a')) return;
      const rect = panel.getBoundingClientRect();
      panelDragging = true;
      panelOffsetX = event.clientX - rect.left;
      panelOffsetY = event.clientY - rect.top;
      panel.setPointerCapture(event.pointerId);
      panel.classList.add('is-dragging');
    });
    panel.addEventListener('pointermove', event => {
      if (!panelDragging) return;
      moveFloatingAiPanel(event.clientX - panelOffsetX, event.clientY - panelOffsetY);
    });
    const stopPanelDragging = () => {
      panelDragging = false;
      panel.classList.remove('is-dragging');
    };
    panel.addEventListener('pointerup', stopPanelDragging);
    panel.addEventListener('pointercancel', stopPanelDragging);
  }
  window.addEventListener('resize', positionFloatingAiPanel);
}

function initAiChatPersistence() {
  if (!document.getElementById('aiChatMessages')) return;
  initAiAvailabilityListener();
  initFloatingAiAssistant();
  const sessionRef = getAiSessionRef();
  if (sessionRef) sessionRef.get().then(snapshot => {
    if (!snapshot.exists) return;
    const messages = snapshot.data().messages || [];
    if (!messages.some(item => item.type === 'user' && item.message?.trim())) {
      sessionRef.delete().catch(() => {});
      localStorage.setItem(aiHistoryStorageKey, JSON.stringify(JSON.parse(localStorage.getItem(aiHistoryStorageKey) || '[]').filter(id => id !== aiSessionId)));
      return;
    }
    loadAiChatSession(aiSessionId);
  }).catch(() => {});
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initAiChatPersistence); else initAiChatPersistence();
