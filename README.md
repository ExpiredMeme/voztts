# Features
## Realtime voice conversations
Have conversations with a chatbot that responds instantly to you and your friends in Discord voice channels.

## Custom AI voices
Create and manage voices using your own audio samples. Clone voices in as little as 5 seconds of audio.

## Custom sound effects
Have a custom sound effect play when a particular voice is activated.

## GUI and Discord commands
Set everything up in an easy to use GUI, then you or your friends can issue commands in a text channel to add new voices, sound effects, control wake words, and more.

## Local AI models
Download and import Local Language Models in just a few clicks in the GUI.

## Custom personalities
Give each voice its own personality and behaviour.

## Wake words
Configure how and when Voz responds in your server.

## Web Search (Experimental)
Let Voz search the web for information when needed.

## Privacy
Installed and ran locally on your PC. Your conversations are between you and your local chatbot. Nothing is saved, no one other than whoever is in your Discord call has access to conversations.

# Guide

## 01 Download and install Voz

Download the free Windows Installer.
Run the installer and follow setup instructions. It may take a while to download all dependencies.
Launch Voz from the executable, or your desktop shortcut.

## 02Create your Discord bot

Firstly, click "New Application" on the top right.
    Discord Developer Portal Applications page showing the New Application button in the top right
    Discord Developer Portal — Applications
Give it whatever name you want. This will be used to call the bot into your voice channel when you mention it, but the nickname can later be changed in your server.
On the left side of the screen, click "Installation", then choose "None" in the dropdown for "Install Link", then save the change.
Discord Developer Portal Installation settings with Install Link dropdown set to None
Installation — set Install Link to None
    In the "Bot" section, first obtain the bot token and note it down in a notepad. This will be pasted into your GUI later. It can be reset at a later date if needed.
    In this section you can toggle on Presence, Server Members, and Message Content intent, but it should not be necessary.
    On the left hand side, click "OAuth2", and tick "bot" and "application.commands" in the "OAuth2 URL Generator" section. Give the bot permissions "View channels, Send messages, Embed links, Read message history, Connect, and Speak." A URL should be generated at the bottom. Copy and paste this in your web browser, and invite the bot into your server.
    Discord OAuth2 URL Generator with bot and applications.commands scopes selected and required bot permissions checked
    OAuth2 scopes and bot permissions — click to enlarge
    That should be everything needed. Make sure you have your bot token, and do not show it to anyone!
