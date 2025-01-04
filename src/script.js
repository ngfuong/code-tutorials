const imageContainer = document.getElementById('image-container');
const images = {
  step1: document.getElementById('image-step1'),
  step2: document.getElementById('image-step2'),
  step3: document.getElementById('image-step3'),
};

const codeContent = `
        <div class="code-preview">
            <pre><code>
<span class="keyword">import</span> <span class="type">SwiftUI</span>

<span class="keyword">struct</span> <span class="type">ContentView</span>: <span class="type">View</span> {
    <span class="keyword">var</span> <span class="function">body</span>: <span class="type">some</span> <span class="type">View</span> {
        <span class="type">Text</span>(<span class="string">"Hello, SwiftUI!"</span>)
            .<span class="function">padding</span>()
    }
}
            </code></pre>
        </div>`;

// Function to set the active step
function setActiveStep(stepId) {
    // Get all description elements
    const descriptions = document.querySelectorAll('.description');

    // Remove the active class from all descriptions
    descriptions.forEach(description => description.classList.remove('active'));

    // Add the active class to the target description
    const targetDescription = document.querySelector(`.description[data-step="${stepId}"]`);
    if (targetDescription) {
      targetDescription.classList.add('active');
      targetDescription.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'nearest',
    });
    }
    
    updateImage(stepId);
}

// Function to update the image in the container
function updateImage(stepId) {
  imageContainer.innerHTML = "";

  if (stepId === "step4") {
    imageContainer.innerHTML = codeContent;
  } else {
    console.log(stepId);
    images[stepId].classList.remove('hidden');
    imageContainer.appendChild(images[stepId]);
  }
}

// Highlight the first step initially
let activeStep = "step1";
images[activeStep].classList.remove('hidden');
setActiveStep(activeStep);

// Scroll event listener
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('.step');
    let scrolledPastSection = "step1";

    sections.forEach(section => {
        const rect = section.getBoundingClientRect();

        // Check if the section is scrolled past (its bottom is above the middle of the viewport)
        if (rect.bottom < window.innerHeight/1.5) {
            scrolledPastSection = section.id;
        }
    });

    if (scrolledPastSection !== activeStep) {
        activeStep = scrolledPastSection;
        setActiveStep(activeStep);
    }
});

document.getElementById('dark-mode-toggle').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});
