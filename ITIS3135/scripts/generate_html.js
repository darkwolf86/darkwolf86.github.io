// generate_html.js
/* document.addEventListener("DOMContentLoaded", () => {
  const htmlBtn = document.getElementById("generateHTML");
  const form = document.getElementById("form");
  const introOutput = document.getElementById("introOutput");

  htmlBtn.addEventListener("click", () => {
    const f = id => document.getElementById(id)?.value || "";
    const courses = Array.from(document.querySelectorAll("#courses .course")).map(course => ({
      dept: course.querySelector(".dept").value,
      number: course.querySelector(".number").value,
      name: course.querySelector(".name").value,
      reason: course.querySelector(".reason").value
    })); */

    // generate_html.js
document.addEventListener("DOMContentLoaded", () => {
  const htmlBtn = document.getElementById("generateHTML");
  const form = document.getElementById("form");
  const introOutput = document.getElementById("introOutput");

  htmlBtn.addEventListener("click", () => {
    const f = (id) => (document.getElementById(id) ? document.getElementById(id).value : "");
    const courses = Array.from(document.querySelectorAll("#courses .course")).map((course) => ({
      dept: course.querySelector(".dept").value,
      number: course.querySelector(".number").value,
      name: course.querySelector(".name").value,
      reason: course.querySelector(".reason").value
    }));


    const htmlContent = `
<h2>Introduction HTML</h2>
<h3>${f("firstName")} ${f("middleName")} "${f("preferredName")}" ${f("lastName")} ${f("divider")} ${f("mascotAdjective")} ${f("mascotAnimal")}</h3>
<figure>
  <img src="${f("pictureUrl") || "images/Helldivers-2-Symbol-500x281.png"}" alt="${f("caption")}" />
  <figcaption>${f("caption")}</figcaption>
</figure>
<ul>
  <li><strong>Personal Background:</strong> ${f("personalStatement")}</li>
  <li><strong>Professional Background:</strong> ${f("professional")}</li>
  <li><strong>Academic Background:</strong> ${f("academic")}</li>
  <li><strong>Subject Background:</strong> ${f("subject")}</li>
  <li><strong>Primary Computer:</strong> ${f("platform")}</li>
</ul>
<h3>Courses</h3>
<ul>
${courses.map((c) => `<li>${c.dept} ${c.number}: ${c.name} — ${c.reason}</li>`).join("")}
</ul>
<h3>Links</h3>
<ul>
  <li><a href="${f("github")}">GitHub</a></li>
  <li><a href="${f("githubio")}">GitHub Page</a></li>
  <li><a href="${f("freecodecamp")}">freeCodeCamp</a></li>
  <li><a href="${f("linkedin")}">LinkedIn</a></li>
  <li><a href="${f("githubitis")}">ITIS3135 GitHub.io</a></li>
</ul>
    `.trim();

    form.style.display = "none";
    document.querySelector("h2").textContent = "Introduction HTML";
    introOutput.innerHTML = `
      <section>
        <pre><code class="language-html">${htmlContent.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</code></pre>
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
