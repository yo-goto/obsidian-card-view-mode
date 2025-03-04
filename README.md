# Obsidian Card View Mode
![GitHub release (latest SemVer)](https://img.shields.io/github/v/release/yo-goto/obsidian-card-view-mode)
![GitHub All Releases](https://img.shields.io/github/downloads/yo-goto/obsidian-card-view-mode/total?color=red)

![main screen shot](https://raw.githubusercontent.com/yo-goto/obsidian-card-view-mode/master/resource/screenshot_main_light-min.png)

## Feature.1 Card View

This plugin is inspired by [Scrapbox](https://scrapbox.io/product?lang=en) (a web-based wiki tool) & Zettelkasten method (Slip box) by Niklas Luhmann.

I found all of the notes are not in the same stage while developing. We need some ways to distinguish the stages. The card view feature is one way to weigh notes and express them. You can assess whether your notes are **atomic**, then, if you feel your note is longer and not atomic, you can divide or extract the contents.

The vertical size of each note (a.k.a card) can be extended or reduced based on the amount of content on them. At a glance, you can easily find how mature your note is at the early stage of note-taking, note-making, or eventually **note-developing**.

I highly recommend you to use this plugin with the Sliding Pane plugin. I made this to be compatible with that and the Embedded Note Titles plugin.

## Feature.2 Attention Pane

Another feature is “Attention Pane”. An active pane card is highlighted and the others are grayed out. This enables you to find an active pane easily and focus on the note. You can pay attention to the specific pane among many notes!!

Active and non-active cards are rendered with different RGB color values. You can set the value difference in the setting tab. Set the value 0 if you want to disable this feature.

## Demo

![Screenshot](https://raw.githubusercontent.com/yo-goto/obsidian-card-view-mode/master/resource/screenshot.gif)

## Settings

Card colors, background color, card shapes are configurable in the settings tab.

![setting 1](https://raw.githubusercontent.com/yo-goto/obsidian-card-view-mode/master/resource/sc_setting-1-min.png)

![setting 2](https://raw.githubusercontent.com/yo-goto/obsidian-card-view-mode/master/resource/sc_setting-2-min.png)


- You can globally turn on/off this plugin with a command at any time.
- You can customize the card design(colors, corner radius, drop shadow).

## Compatibility

- [Sliding Panes (Andy Matuschak Mode)](https://github.com/deathau/sliding-panes-obsidian)
- [Embedded Note Title](https://github.com/mgmeyers/obsidian-embedded-note-titles)
- [Banners](https://github.com/noatpad/obsidian-banners) (compatibility is not yet stable)

# Development

[Roadmap](https://github.com/yo-goto/obsidian-card-view-mode/projects/1)
## How to install manually

- Clone this repo
- `npm i` or `yarn` to install dependencies
- `npm run dev` to compile
- Copy `manifiest.json`, `main.js` and `styles.css` to a subfolder of your plugins folder
- Reload obsidian to see changes

## Special Thanks

Special thanks to these amazing plugins! I used these plugins as a reference for developing my first public plugin. The plugin basic structure is mainly based on the Sliding Pane. I referred to other plugins to build the color configuration system.

- [Sliding Panes (Andy Matuschak Mode)](https://github.com/deathau/sliding-panes-obsidian) by deathau
- [Admonition](https://github.com/valentine195/obsidian-admonition) by valentine195
- [Minimal Theme Settings](https://github.com/kepano/obsidian-minimal-settings) by kepano
- [Embedded Code Title](https://github.com/tadashi-aikawa/obsidian-embedded-code-title) by tadashi-aikawa
- [Calendar](https://github.com/liamcain/obsidian-calendar-plugin) by liamcain

## Original CSS

I've developed this plugin from a custom CSS snippet but I changed it into an SCSS file. If you get interested in the CSS style, you can see the original snippet linked below.

[Gist Link](https://gist.github.com/yo-goto/742906c6463310e3f4e18c745dede016)
