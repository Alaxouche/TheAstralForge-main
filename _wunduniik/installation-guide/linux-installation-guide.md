---
layout: skyground_readme
title: Linux Installation Guide
parent: Installation Guide
nav_order: 7
reading_mode_default: true
---

# Wunduniik on Linux: A User's Guide 🐧

Wunduniik V6 is not officially supported on Linux by the modlist's creator, Alaxouche. However, with a few extra steps, the Wabbajack installation can be adapted to work successfully. This guide assumes you have a basic understanding of Linux and Mod Organizer 2 (MO2).

### 1. The Omni-Guide's Installation Process

The process involves two main steps: first, installing Wabbajack via Proton, and then using the Omni-guide's automation script to install the modpack itself.

*   **Install Wabbajack:** Follow the instructions in the [Wabbajack via Proton Guide](https://github.com/Omni-guides/Wabbajack-Modlist-Linux/wiki/Wabbajack-via-Proton).
*   **Install the Modpack:** Once Wabbajack is installed, use the [omni-guides.sh automation script](https://github.com/Omni-guides/Wabbajack-Modlist-Linux/wiki/Using-the-omni%E2%80%90guides.sh-Automation-Script) to install the modpack.

> **Note:** When you launch Mod Organizer 2 for the first time after the installation finishes, an error from the **Frame Gen Compatibility Checker** will appear. This is expected because the checker does not work on Linux. Simply click **OK** to dismiss the message and continue.

### 2. Configure Mod Organizer 2

Once Wabbajack has successfully completed its installation, you need to make a few specific changes inside Mod Organizer 2 (MO2) to properly launch Wunduniik.

*   In MO2, locate the executable dropdown menu (it's usually in the top right corner).
*   Change the selected launcher from the default to **Wunduniik Legacy**.

### 3. Handling Frame Generation

As mentioned, the **Frame Gen Compatibility Checker** will give an error on launch and will not work on Linux. You can safely click **OK** whenever this error appears.

If you would like to enable frame generation, you may do so at your own risk. To attempt this, you must enable the **"(ENB) ENB Frame Gen"** mod, which is located under section **16.1 ENBSERIES - Core Files** in the main mod list panel of Mod Organizer 2.

### 4. Troubleshooting

#### Game Closes Immediately After Launch

If the game immediately closes after a brief loading screen (specifically after showing the `VFS` loading), do the following:

*   In MO2, open the executable dropdown menu and select **Edit**.
*   Click the **+** button at the top of the list to add a new executable.
*   Select **Add from file...**
*   Navigate to your modpack's installation folder, then open the `Game Root` folder.
*   Select `SkyrimSELauncher.exe` and click **Open**.
*   Press **OK** to save the new executable.
*   Now, select the newly added **SkyrimSELauncher** from the executable dropdown and click **Run**.
*   The vanilla launcher will open and automatically select a graphics preset for you. You do not need to change anything.
*   **Close the vanilla launcher window** and change the MO2 executable back to **Wunduniik Legacy**.

### 5. Enjoy Wunduniik V6 on Linux! 🎉

You should now be able to launch Wunduniik V6 and play it on your Linux machine. If you encounter any further issues, please refer to the **Wabbajack Discord server in the #unofficial-linux-help channel** for troubleshooting assistance.```
