function addGenerateButton() {
    // Check if button already exists
    if (document.getElementById("ai-reply-btn")) return;

    // Find Gmail's toolbar in compose box
    const toolbar = document.querySelector(".dC");
    if (!toolbar) return;

    // === Create AI Reply Button ===
    const button = document.createElement("button");
    button.id = "ai-reply-btn";
    button.textContent = "AI Reply";
    button.style.padding = "6px 12px";
    button.style.background = "#2767cd";
    button.style.color = "white";
    button.style.border = "none";
    button.style.borderRadius = "5px 0 0 5px"; // rounded left only
    button.style.cursor = "pointer";
    button.style.fontSize = "14px";
    button.style.height = "32px";   // fixed height

    // === Create Tone Dropdown ===
    const select = document.createElement("select");
    select.id = "tone-select";
    select.style.padding = "6px 10px";
    select.style.border = "none";
    select.style.borderRadius = "0 5px 5px 0"; // rounded right only
    select.style.background = "#2767cd";
    select.style.color = "white";
    select.style.cursor = "pointer";
    select.style.fontSize = "14px";
    select.style.height = "32px";   // same height as button
    select.style.outline = "none";

    const tones = ["Formal", "Friendly", "Polite", "Concise"];
    tones.forEach(tone => {
        const option = document.createElement("option");
        option.value = tone.toLowerCase();
        option.textContent = tone;
        select.appendChild(option);
    });

    // === Wrapper div (to group button + dropdown like Send button) ===
    const wrapper = document.createElement("div");
    wrapper.style.display = "inline-flex";
    wrapper.style.alignItems = "center";
    wrapper.style.marginLeft = "8px";

    wrapper.appendChild(button);
    wrapper.appendChild(select);

    // Insert into Gmail toolbar
    toolbar.appendChild(wrapper);

    // === Add click event ===
    button.addEventListener("click", async () => {
        const emailBodyElement = document.querySelector(".Am.Al.editable"); // Gmail compose box
        if (!emailBodyElement) {
            alert("Could not find email body");
            return;
        }

        const emailContent = emailBodyElement.innerText;
        const tone = select.value;

        // Ask backend for reply
        button.textContent = "⏳ Generating...";
        try {
            const response = await fetch("http://localhost:8080/api/email/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ emailcontent: emailContent, tone })
            });

            if (!response.ok) throw new Error("Failed to generate reply");
            const reply = await response.text();

            // Insert reply into Gmail compose box
            emailBodyElement.innerText = "\n\n" + reply;

            button.textContent = "AI Reply";
        } catch (err) {
            alert("Error: " + err.message);
            button.textContent = "AI Reply";
        }
    });
}

// Watch for compose window changes
const observer = new MutationObserver(() => {
    addGenerateButton();
});
observer.observe(document.body, { childList: true, subtree: true });
