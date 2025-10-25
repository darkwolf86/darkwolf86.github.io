// introduction.js

// Wait for DOM to load before running
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form");
  const introOutput = document.getElementById("introOutput");
  const addCourseBtn = document.getElementById("addCourse");
  const clearFormBtn = document.getElementById("clearForm");

  // -------------------------------
  // Function to gather data and display intro
  // -------------------------------
  function generateIntroduction() {
    introOutput.innerHTML = "";
    // Required fields validation
    const requiredFields = ["firstName", "lastName", "ackStatement", "ackDate", "mascotAdjective", "mascotAnimal"];
    for (const id of requiredFields) {
      const field = document.getElementById(id);
      if (!field.value.trim()) {
        alert(`Please fill in the required field: ${id}`);
        field.focus();
        return;
      }
    }

    // Collect form data
    const f = (id) => (document.getElementById(id) && document.getElementById(id).value) || "";

    const courses = Array.from(document.querySelectorAll("#courses .course")).map((course) => ({
      dept: course.querySelector(".dept").value,
      number: course.querySelector(".number").value,
      name: course.querySelector(".name").value,
      reason: course.querySelector(".reason").value
    }));

    
    //const pictureSrc = f("pictureUrl");
    const pictureSrc = f("pictureUrl") || "images/Helldivers-2-Symbol-500x281.png";

    const uploadedPic = document.getElementById("picture").files[0];
    const pictureURL = uploadedPic ? URL.createObjectURL(uploadedPic) : pictureSrc;

    // Create the intro HTML
    introOutput.innerHTML = `
      <h2>Introduction</h2>
      <p style="text-align: center;">${f("firstName")} ${f("middleName")} "${f("preferredName")}" ${f("lastName")}</p>

      <figure style="text-align: center;">
        <img src="${pictureURL}" alt="${f("caption")}" style="max-width: 100%; height: auto; display: inline-block;">
        <figcaption style="text-align: center;">${f("caption")}</figcaption>
      </figure>

      <ul>
        <li>Personal background: ${f("personalStatement")}</li>
        <li>Professional background: ${f("professional")}</li>
        <li>Academic background: ${f("academic")}</li>
        <li>Background in subject: ${f("subject")}</li>
        <li>Computer platform: ${f("platform")}</li>
        <li>Why I am taking the course: ${f("reason")}</li>
        <li>Interesting fact: ${f("fact")}</li>
        <li>Hobbies: ${f("hobbies")}</li>
        <li>Graduating: ${f("graduating")}</li>
        <li>From NC: ${f("from")}</li>
      </ul>

      <h3>Courses</h3>
      <ul>
        ${courses
          .map(
            (c) =>
              `<li>${c.dept} ${c.number}: ${c.name} — ${c.reason || ""}</li>`
          )
          .join("")}
      </ul>

      <blockquote>
        <p>"${f("quote")}"</p>
        <cite>– ${f("quoteAuthor")}</cite>
      </blockquote>

      ${f("funnyThing") ? `<p><strong>Funny thing:</strong> ${f("funnyThing")}</p>` : ""}
      ${f("share") ? `<p><strong>Something I'd like to share:</strong> ${f("share")}</p>` : ""}

      <h3>Links</h3>
      <p>
        <a href="${f("linkedin")}" target="_blank">LinkedIn</a> ${f("divider")}
        <a href="${f("github")}" target="_blank">GitHub</a> ${f("divider")}
        <a href="${f("githubio")}" target="_blank">GitHub.io</a> ${f("divider")}
        <a href="${f("githubitis")}" target="_blank">ITIS3135 GitHub.io</a> ${f("divider")}
        <a href="${f("freecodecamp")}" target="_blank">FreeCodeCamp</a>
      </p>

      <hr>
      <button id="resetView" style="margin-top:20px;">Reset to Form</button>
    `;

    // Reset view button to show form again
    document.getElementById("resetView").addEventListener("click", () => {
      introOutput.innerHTML = "";
      form.reset();
      form.style.display = "block";
      window.scrollTo(0, 0);
    });

    // Hide the form once submitted
    form.style.display = "none";
  }

  // -------------------------------
  // Event Listeners
  // -------------------------------

  // Prevent page reload on form submission
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    generateIntroduction();
  });

  // Reset button returns form to default values (browser handles default)
  form.addEventListener("reset", () => {
    introOutput.innerHTML = "Please submit the form below.";
  });

  // Clear button empties all fields
  clearFormBtn.addEventListener("click", () => {
    Array.from(form.elements).forEach((el) => {
      if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
        if (el.type !== "button" && el.type !== "submit" && el.type !== "reset") {
          el.value = "";
        }
      }
    });
    document.getElementById("courses").innerHTML = ""; // remove any added courses
  });

  // Add new course fieldset dynamically
  addCourseBtn.addEventListener("click", () => {
    const courseContainer = document.getElementById("courses");

    const div = document.createElement("div");
    div.classList.add("course");
    div.innerHTML = `
      <input type="text" class="dept" placeholder="Dept (e.g. ITIS)" required>
      <input type="text" class="number" placeholder="Number (e.g. 3135)" required>
      <input type="text" class="name" placeholder="Course Name" required>
      <input type="text" class="reason" placeholder="Reason for taking">
      <button type="button" class="deleteCourse">Delete</button>
    `;
    courseContainer.appendChild(div);

    // Delete button functionality for the new course
    div.querySelector(".deleteCourse").addEventListener("click", () => {
      div.remove();
    });
  });

  // Add delete functionality for the original course too
  document.querySelectorAll(".deleteCourse").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.target.parentElement.remove();
    });
  });
});
