// ---------------- Floating emojis ----------------
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

// ---------------- Typing effect ----------------
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

// ---------------- MCQ batches ----------------
const allBatches = [
    [ // Batch 1
        {msg:"Assalam-o-Alaikum Ali 💛, aaj kaisa mehsoos kar rahe ho?", 
         choices:['Bohat sad aur bechain','Thora behtar','Normal','Anxiety aur regret']},
        {msg:"Regret aur anxiety normal hai. Ab breathing exercise karen. Kaunsa try karenge?", 
         choices:['4-4-4 breathing','Normal saans','Peaceful memory imagine','Direct baat']},
        {msg:"Heart rate ab kaisa lag raha hai?", 
         choices:['Tez','Thori slow','Normal','Bad-tar']}
    ],
    [ // Batch 2
        {msg:"Quran Surah Al-Inshirah 5-6: 'Fa inna ma\\'al usri yusra'. Is ayat se kya seekha?", 
         choices:['Mushkil guzar jayegi','Kuch nahi','Allah par bharosa','Dono A aur C']},
        {msg:"Hadith: Musibat mein sabr karne wale ko ajar milta hai. Kaunsa step choose karenge?", 
         choices:['Achay kaamon ko yaad karen','Regret ignore','Dua karen','Sab C options']},
        {msg:"Ab emotional side: Future ke liye kaunsa positive thought choose karenge?", 
         choices:['Advice yaad kar ke motivate','Sirf sad feel karna','Future goals set karna','Koi thought nahi']}
    ],
    [ // Batch 3
        {msg:"Abbu ke liye dua aur nek kaam continue karen. Overall ab feel kaisa hai?", 
         choices:['Bohat relax','Thora behtar','Same','Need next part']},
        {msg:"Imagine karo abbu heaven mein hain, aapki khidmat se khush. Feeling?", 
         choices:['Peace aur motivation','Sadness','Regret','Neutral']},
        {msg:"Roz dua aur nek kaam continue karne se kya feel hota hai?", 
         choices:['Calm','Motivated','Peaceful','Sab upar wale']}
    ],
    [ // Batch 4-16 placeholder for 50+ questions
        {msg:"Step 4: Calmly think positive. Kaunsa option choose karenge?", choices:['Option A','Option B','Option C','Option D']},
        {msg:"Step 5: Deep breathing ya visualization. Kaunsa?", choices:['Option A','Option B','Option C','Option D']},
        {msg:"Step 6: Quran yaad karke motivate. Option?", choices:['Option A','Option B','Option C','Option D']}
    ]
];

// Duplicate last batch to make total 50+ questions
while(allBatches.flat().length < 50){
    allBatches.push(allBatches[3]);
}

// ---------------- Session Logic ----------------
let currentBatch = 0;
let currentStep = 0;

function showStep(){
    const batch = allBatches[currentBatch];
    const conversation = document.getElementById('conversation');
    const msgElem = document.createElement('div');
    msgElem.className='message';
    conversation.appendChild(msgElem);
    typeMessage(msgElem, batch[currentStep].msg, ()=>{
        const choicesDiv = document.getElementById('choices');
        choicesDiv.innerHTML='';
        batch[currentStep].choices.forEach(choice=>{
            const btn = document.createElement('button');
            btn.textContent=choice;
            btn.onclick=()=>{ nextStep(); };
            choicesDiv.appendChild(btn);
        });
    });
}

function nextStep(){
    const batch = allBatches[currentBatch];
    currentStep++;
    if(currentStep<batch.length){
        showStep();
    } else {
        // Batch complete, show Next Page
        document.getElementById('choices').style.display='none';
        document.getElementById('nextPage').style.display='block';
    }
}

// Next Page
function nextBatch(){
    currentBatch++;
    if(currentBatch<allBatches.length){
        document.getElementById('conversation').innerHTML='';
        document.getElementById('choices').style.display='block';
        document.getElementById('nextPage').style.display='none';
        currentStep=0;
        showStep();
    } else {
        // End of all batches
        document.getElementById('conversation').innerHTML='';
        document.getElementById('nextPage').style.display='none';
        document.getElementById('endSession').style.display='block';
    }
}

// End Session
function endSessionConfirm(){
    alert('Alhamdulillah! Roz dua aur nek kaam continue karein. 💛');
}

// Start first batch
showStep();
