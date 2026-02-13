// Floating emojis
const emojis = ['💛','🌸','✨','🌿','💫'];
function floatingEmojis(){
    const elem = document.createElement('div');
    elem.className = 'floating';
    elem.textContent = emojis[Math.floor(Math.random()*emojis.length)];
    elem.style.left = Math.random()*90 + 'vw';
    elem.style.top = '100vh';
    elem.style.fontSize = (Math.random()*20 + 20) + 'px';
    document.body.appendChild(elem);
    setTimeout(()=>{ elem.remove(); }, 7000);
}
setInterval(floatingEmojis, 1000);

// Typing effect
function typeMessage(element, text, callback){
    let index=0;
    element.style.opacity=1;
    element.textContent='';
    function typeChar(){
        if(index<text.length){
            element.textContent += text.charAt(index);
            index++;
            setTimeout(typeChar,50);
        } else if(callback){
            callback();
        }
    }
    typeChar();
}

// ---------------- Session Flow ---------------- //
// 50-step session
const sessionFlow = [
    {msg:"Therapist: Assalam-o-Alaikum Ali 💛, aaj hum therapy session start karte hain. Kaisa mehsoos kar rahe ho?", 
     choices:['Bohat sad aur bechain','Thora behtar','Normal','Anxiety aur regret']},
    {msg:"Therapist: Theek hai, regret normal hai. Ab ek breathing exercise karte hain. Kaunsa choose karenge?", 
     choices:['4-4-4 breathing','Normal saans','Peaceful memory','Direct baat']},
    {msg:"Therapist: Bohat achay. Heartbeat kaisa feel hota hai?", 
     choices:['Tez','Thori slow','Normal','Bad-tar']},
    {msg:"Therapist: Quran Surah Al-Inshirah 5-6: 'Fa inna ma'al usri yusra'. Is ayat se kya seekha?", 
     choices:['Mushkil guzar jayegi','Kuch nahi','Allah par bharosa','Dono A aur C']},
    {msg:"Therapist: Hadith: Prophet (PBUH) ne farmaya musibat mein sabr karne wale ko ajar milta hai. Kaunsi advice better lagegi?", 
     choices:['Apne achay kaamon ko yaad karen','Regret ignore karen','Dua karen','Sab C options']},
    {msg:"Therapist: Emotional side: Kaunsa positive thought choose karenge future ke liye?", 
     choices:['Advice yaad kar ke motivate hoon','Sirf sad feel karoon','Future goals set karoon','Koi thought nahi']},
    {msg:"Therapist: Abbu ke liye dua aur nek kaam continue karein. Overall ab feel kaisa hai?", 
     choices:['Bohat relax','Thora behtar','Same','Need one more session']},
    // Steps 8-50: Add similar motivational, spiritual, emotional MCQs
];

// For demo, I'll replicate sessionFlow 8-50 with slight variations
for(let i=7;i<50;i++){
    sessionFlow.push({
        msg:`Therapist: Step ${i+1} - Keep calm and think positive. Kaunsa option choose karenge?`,
        choices:['Option A','Option B','Option C','Option D']
    });
}

// ---------------- Session Logic ---------------- //
let currentStep=0;

function showStep(step){
    const conversation = document.getElementById('conversation');
    const msgElem = document.createElement('div');
    msgElem.className='message';
    conversation.appendChild(msgElem);
    typeMessage(msgElem, sessionFlow[step].msg, ()=>{
        // Show choices
        const choicesDiv = document.getElementById('choices');
        choicesDiv.innerHTML='';
        sessionFlow[step].choices.forEach(choice=>{
            const btn = document.createElement('button');
            btn.textContent=choice;
            btn.onclick=()=>{ nextStep(); };
            choicesDiv.appendChild(btn);
        });
    });
}

function nextStep(){
    currentStep++;
    if(currentStep<sessionFlow.length){
        showStep(currentStep);
    } else {
        document.getElementById('choices').style.display='none';
        document.getElementById('endSession').style.display='block';
    }
}

// Start session
showStep(currentStep);

// End session
function endSessionConfirm(){
    alert('Alhamdulillah! Session complete. Roz dua aur nek kaam continue karein. 💛');
}
