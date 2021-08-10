import { App, Plugin, PluginSettingTab, Setting } from 'obsidian';


// declare がよくわからない
declare class CardViewModePlugin extends Plugin {
  settings: CardViewModeSettings;
  disable(): void;
  enable(): void;
  refresh(): void;
}

export class CardViewModeSettings {
  disabled: boolean = false;
  cardTitle: boolean = false;
  // reverseColor: boolean = true;
}

export class CardViewModeSettingTab extends PluginSettingTab {

  plugin: CardViewModePlugin;
  constructor(app: App, plugin: CardViewModePlugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display(): void {
    let { containerEl } = this;

    containerEl.empty();

    new Setting(containerEl)
      .setName("Toggle Card View")
      .setDesc("Turns card view mode on or off globally")
      .addToggle(toggle => toggle.setValue(!this.plugin.settings.disabled)
        .onChange((value) => {
          this.plugin.settings.disabled = !value;
          this.plugin.saveData(this.plugin.settings);
          if (this.plugin.settings.disabled) {
            this.plugin.disable();
          }
          else {
            this.plugin.enable();
          }
        }
      )
    );

    new Setting(containerEl)
      .setName("Toggle Card Title")
      .setDesc("Experimental: View titles as cards. Enable this option with Embedded Note Title Plugin.")
      .addToggle(toggle => toggle.setValue(this.plugin.settings.cardTitle)
        .onChange((value) => {
          this.plugin.settings.cardTitle = value;
          this.plugin.saveData(this.plugin.settings);
          this.plugin.refresh();
        }
      )
    );
  }
}

export class CardViewModeCommands {
  plugin: CardViewModePlugin;
  constructor(plugin: CardViewModePlugin) {
    this.plugin = plugin;
  }

  addToggleSettingCommand(id:string, name:string, settingName:string) {
    this.plugin.addCommand({
      id: id,
      name: name,
      callback: () => {
        // switch the setting, save and refresh
        //@ts-ignore
        this.plugin.settings[settingName] = !this.plugin.settings[settingName];
        this.plugin.saveData(this.plugin.settings);
        this.plugin.refresh();
      }
    });
  }

  addCommands(): void {
    // add the toggle on/off command
    this.plugin.addCommand({
      id: 'toggle-card-view-mode',
      name: 'Toggle Card View',
      callback: () => {
        // switch the disabled setting and save
        this.plugin.settings.disabled = !this.plugin.settings.disabled;
        this.plugin.saveData(this.plugin.settings);

        // disable or enable as necessary
        this.plugin.settings.disabled ? this.plugin.disable() : this.plugin.enable();
      }
    });
    
    // this.addToggleSettingCommand('toggle-card-color-reverse', 'Toggle Card Colords', 'reverseColor');
    this.addToggleSettingCommand('toggle-card-title', 'Toggle Card Title', 'cardTitle');
  }
}