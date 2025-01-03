const imageContainer = document.getElementById('image-container');
const images = {
  step1: document.getElementById('image-step1'),
  step2: document.getElementById('image-step2'),
  step3: document.getElementById('image-step3'),
};

const codeContent = `
  <pre><code>
  // <span class="comment">// ContentView.swift</span>
  <span class="keyword">import</span> <span class="type">SwiftUI</span>

  <span class="keyword">struct</span> <span class="type">ContentView</span>: <span class="type">View</span> {
      <span class="keyword">var</span> <span class="function">body</span>: <span class="type">some</span> <span class="type">View</span> {
          <span class="type">Text</span>(<span class="string">"Hello, world!"</span>)
              .<span class="function">padding</span>()
      }
  }
  </code></pre>`;
// Initialize state
let activeStep = "step1";

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
    }
    
    updateImage(stepId);
}

// Function to update the image in the container
function updateImage(stepId) {
  imageContainer.innerHTML = "";

  if (stepId === "step4") {
    imageContainer.innerHTML = codeContent;
  } else {
    // Object.keys(images).forEach((key) => {
    //   if (key === stepId) {
    //     images[key].classList.remove('hidden');
    //     imageContainer.appendChild(images[key]);
    //   } else {
    //     images[key].classList.add('hidden');
    //   }
    // });
    images[stepId].classList.remove('hidden');
    imageContainer.appendChild(images[stepId])
  }
}

// Highlight the first step initially
setActiveStep(activeStep);

// Scroll event listener
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('.section');
    let scrolledPastSection = null;

    sections.forEach(section => {
        const rect = section.getBoundingClientRect();

        // Check if the section is scrolled past (its bottom is above the middle of the viewport)
        if (rect.bottom < window.innerHeight / 2) {
            scrolledPastSection = section.id;
        }
    });

    if (scrolledPastSection && scrolledPastSection !== activeStep) {
        activeStep = scrolledPastSection;
        setActiveStep(activeStep);
    }
});
