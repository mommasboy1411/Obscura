/**
 * OBSCURA Core Platform Engine - Part 3 Architecture
 * Client-Side Interactivity, Validation & Dynamic Audio Pipeline
 */

document.addEventListener("DOMContentLoaded", () => {
    console.log("Obscura System: High-Fidelity JavaScript Pipeline Active.");

    /* ==========================================
       FEATURE 1: DYNAMIC STREAM AUDIO SWITCHER
       ========================================== */
    const primaryAudioPlayer = document.getElementById("global-player");
    const activeTrackLabel = document.getElementById("current-track-display");
    const selectionControls = document.querySelectorAll(".track-select");

    if (primaryAudioPlayer && selectionControls.length > 0) {
        selectionControls.forEach(control => {
            control.addEventListener("click", (event) => {
                event.preventDefault();
                
                // Extract track metadata attributes
                const targetAudioSource = control.getAttribute("data-src");
                const targetAudioTitle = control.getAttribute("data-title");

                if (targetAudioSource) {
                    // Update player stream src natively
                    primaryAudioPlayer.src = targetAudioSource;
                    primaryAudioPlayer.load();
                    primaryAudioPlayer.play()
                        .then(() => {
                            console.log(`Streaming Active: ${targetAudioTitle}`);
                        })
                        .catch(err => {
                            console.warn("Audio playback delayed due to browser interaction policies:", err);
                        });

                    // Fluidly transition the status display typography text
                    if (activeTrackLabel) {
                        activeTrackLabel.innerHTML = `<strong>Now Playing:</strong> ${targetAudioTitle}`;
                    }
                }
            });
        });
    }

    /* ==========================================
       FEATURE 2: SECURE CLIENT-SIDE FORM VALIDATION
       ========================================== */
    const secureBookingForm = document.getElementById("portal-booking-form");
    const formFeedbackWrapper = document.getElementById("validation-feedback-container");

    if (secureBookingForm) {
        secureBookingForm.addEventListener("submit", (event) => {
            event.preventDefault(); // Intercept default reload behavior
            
            // Clear out any previous alert message blocks
            if (formFeedbackWrapper) {
                formFeedbackWrapper.innerHTML = "";
                formFeedbackWrapper.style.display = "none";
            }

            // Extract input structure values for strict assessment validation
            const promoterName = document.getElementById("input-promoter").value.trim();
            const contactEmail = document.getElementById("input-email").value.trim();
            const eventCategory = document.getElementById("select-category").value;
            const specifications = document.getElementById("textarea-specs").value.trim();

            // Perform logical safety evaluation check
            if (!promoterName || !contactEmail || !eventCategory || !specifications) {
                renderFormMessage("Error: All fields are required to route an inquiry.", "error");
                return;
            }

            // If criteria passes, generate a premium system confirmation banner
            renderFormMessage("TRANSMISSION SECURED: Your booking specification has been routed to the Obscura Archive.", "success");
            secureBookingForm.reset();
        });
    }

    /**
     * Utility method to generate clean, semantic alert layouts inside the form wrapper
     */
    function renderFormMessage(messageText, messageType) {
        if (!formFeedbackWrapper) return;

        formFeedbackWrapper.className = `feedback-message ${messageType === "success" ? "msg-success" : "msg-error"}`;
        formFeedbackWrapper.innerHTML = `<strong>${messageText}</strong>`;
        formFeedbackWrapper.style.display = "block";

        // Auto-fade notification cleanly after a balanced viewing window
        if (messageType === "success") {
            setTimeout(() => {
                formFeedbackWrapper.style.opacity = "0";
                setTimeout(() => {
                    formFeedbackWrapper.innerHTML = "";
                    formFeedbackWrapper.style.display = "none";
                    formFeedbackWrapper.style.opacity = "1";
                }, 500);
            }, 6000);
        }
    }
});