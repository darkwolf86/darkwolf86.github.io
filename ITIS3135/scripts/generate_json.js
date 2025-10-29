// generate_json.js
document.addEventListener("DOMContentLoaded", () => {
  const jsonBtn = document.getElementById("generateJSON");
  const form = document.getElementById("form");
  const introOutput = document.getElementById("introOutput");

  jsonBtn.addEventListener("click", () => {
    const f = id => document.getElementById(id)?.value || "";

    const courses = Array.from(document.querySelectorAll("#courses .course")).map(course => ({
      department: course.querySelector(".dept").value,
      number: course.querySelector(".number").value,
      name: course.querySelector(".name").value,
      reason: course.querySelector(".reason").value
    }));

    const links = [
      { name: "GitHub", href: f("github") },
      { name: "GitHub Page", href: f("githubio") },
      { name: "freeCodeCamp", href: f("freecodecamp") },
      { name: "LinkedIn", href: f("linkedin") },
      { name: "ITIS3135 GitHub.io", href: f("githubitis") }
    ];

    const jsonData = {
      firstName: f("firstName"),
      preferredName: f("preferredName"),
      middleInitial: f("middleName"),
      lastName: f("lastName"),
      divider: f("divider"),
      mascotAdjective: f("mascotAdjective"),
      mascotAnimal: f("mascotAnimal"),
      image: f("pictureUrl") || "images/Helldivers-2-Symbol-500x281.png",
      imageCaption: f("caption"),
      personalStatement: f("personalStatement"),
      personalBackground: f("personalStatement"),
      professionalBackground: f("professional"),
      academicBackground: f("academic"),
      subjectBackground: f("subject"),
      primaryComputer: f("platform"),
      courses: courses,
      links: links
    };

    // Format JSON
    const jsonString = JSON.stringify(jsonData, null, 2);

    // Replace content
    form.style.display = "none";
    document.querySelector("h2").textContent = "Introduction JSON";
    introOutput.innerHTML = `
      <section>
        <pre><code class="language-json">${jsonString}</code></pre>
        <button id="resetView" style="margin-top:20px;">Reset to Form</button>
      </section>
    `;
    hljs.highlightAll();

    document.getElementById("resetView").addEventListener("click", () => {
      form.style.display = "block";
      introOutput.innerHTML = "Please submit the form below.";
      document.querySelector("h2").textContent = "Introduction Form";
    });
  });
});
