
        }
      );
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      userId = data.id;
      validatePassword();
      updateNextBtnColor();
    } catch (error) {
      console.error("Failed to fetch user ID:", error);
    }


    if (!validatePassword() || !checkPasswordMatch()) {
      return;
    }

    const { newpasswordInput } = elements;
    const newpasswordValue = newpasswordInput.value;

    try {
      const response = await fetch(
        `https://port-0-onboarding-server-f02w2almh8gdgs.sel5.cloudtype.app/api/user/${userId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ password: newpasswordValue }),
          credentials: "include",
        }
      );


      window.location.href = "/login";
    } catch (error) {
      console.error("Failed to change password:", error);
    }
