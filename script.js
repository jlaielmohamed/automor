// Automor landing page: email form
// Paste your n8n Webhook (Production URL) between the quotes below.
const WEBHOOK_URL = "";

const btn = document.getElementById("lead-btn");
const input = document.getElementById("lead-email");
const msg = document.getElementById("lead-msg");
const serviceSelect = document.getElementById("service-select");
const formContainer = document.getElementById("email-form-container");
const confirmationContainer = document.getElementById("email-confirmation");
const sendAnotherBtn = document.getElementById("send-another");

async function sendEmail() {
  if (!btn || !input || !msg || !serviceSelect) {
    return;
  }

  const email = input.value.trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    msg.textContent = "Please enter a valid email address.";
    return;
  }

  if (!serviceSelect.value) {
    msg.textContent = "Please select a service.";
    return;
  }

  if (!WEBHOOK_URL) {
    msg.textContent = "The form is not connected yet.";
    return;
  }

  btn.disabled = true;
  const originalText = btn.textContent;
  btn.textContent = "Sending...";
  msg.textContent = "";

  try {
    const res = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        service: serviceSelect.value,
        source: "automor-site",
        date: new Date().toISOString(),
      }),
    });

    if (!res.ok) {
      throw new Error("Request failed");
    }

    // Show confirmation page
    if (formContainer) {
      formContainer.style.display = "none";
    }
    if (confirmationContainer) {
      confirmationContainer.style.display = "flex";
    }
  } catch (err) {
    msg.textContent = "Something went wrong. Please try again.";
  } finally {
    btn.disabled = false;
    btn.textContent = originalText;
  }
}

if (btn) {
  btn.addEventListener("click", sendEmail);
}

if (input) {
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendEmail();
    }
  });
}

if (sendAnotherBtn) {
  sendAnotherBtn.addEventListener("click", () => {
    if (confirmationContainer) {
      confirmationContainer.style.display = "none";
    }
    if (formContainer) {
      formContainer.style.display = "flex";
    }
    if (input) {
      input.value = "";
      input.focus();
    }
    if (msg) {
      msg.textContent = "";
    }
    if (serviceSelect) {
      serviceSelect.selectedIndex = 0;
    }
  });
}
