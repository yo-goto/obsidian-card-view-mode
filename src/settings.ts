import { 
  App, 
  Plugin, 
  PluginSettingTab, 
  Setting, 
  stringifyYaml
} from 'obsidian';


declare class CardViewModePlugin extends Plugin {
  settings: CardViewModeSettings;
  disable(): void;
  enable(): void;
  refresh(): void;
}

export class CardViewModeSettings {
  disabled: boolean = false;
  cardTitle: boolean = false;
  color: string = "#7d7d7d";
  // colorBackGroundLight: string = "#ffffff";
  // colorBackGroundDark: string = "#5e5e5e";
  // colorActiveCardLight: string = "#ffffff";
  // colorActiveCardDark: string = "#474747";
  // colorNonActiveCardDark: String = "#474747";
  // colorNonActiveCardLight: String = "#ffffff";
  colorBackGroundLight: string = "rgb(255, 255, 255)";
  colorBackGroundDark: string = "rgb(94, 94, 94)";
  colorActiveCardLight: string = "rgb(255, 255, 255)";
  colorActiveCardDark: string = "rgb(71, 71, 71)";
  colorNonActiveCardDark: string = "rgb(71, 71, 71)";
  colorNonActiveCardLight: string = "rgb(255, 255, 255)";
  colorDiffBetweenActive: number = 20;
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


    new Setting(containerEl)
      .setName("Background Color in Light Mode")
      .setDesc("Specify background color in light mode")
      .controlEl.createEl(
        "input",
        {
            type: "color",
            value: rgbToHex(this.plugin.settings.colorBackGroundLight)
        },
        (el) => {
            el.value = rgbToHex(this.plugin.settings.colorBackGroundLight);
            el.oninput = ({ target }) => {
                let color = hexToRgb((target as HTMLInputElement).value);

                if (!color) return;
                this.plugin.settings.colorBackGroundLight = `${color.r}, ${color.g}, ${color.b}`;
                this.plugin.saveData(this.plugin.settings)
                this.plugin.refresh();
            };
        }
    );
    
    new Setting(containerEl)
      .setName("Background Color in Dark Mode")
      .setDesc("Specify background color in dark mode")
      .controlEl.createEl(
        "input",
        {
            type: "color",
            value: rgbToHex(this.plugin.settings.colorBackGroundDark)
        },
        (el) => {
            el.value = rgbToHex(this.plugin.settings.colorBackGroundDark);
            el.oninput = ({ target }) => {
                let color = hexToRgb((target as HTMLInputElement).value);

                if (!color) return;
                this.plugin.settings.colorBackGroundDark = `${color.r}, ${color.g}, ${color.b}`;
                this.plugin.saveData(this.plugin.settings)
                this.plugin.refresh();
            };
        }
    );


    new Setting(containerEl)
      .setName("Active Card Color in Dark Mode")
      .setDesc("Specify active card color in dark mode")
      .controlEl.createEl(
        "input",
        {
            type: "color",
            value: rgbToHex(this.plugin.settings.colorActiveCardDark)
        },
        (el) => {
            el.value = rgbToHex(this.plugin.settings.colorActiveCardDark);
            el.oninput = ({ target }) => {
                let color = hexToRgb((target as HTMLInputElement).value);

                if (!color) return;
                this.plugin.settings.colorActiveCardDark = `${color.r}, ${color.g}, ${color.b}`;
                this.plugin.settings.colorNonActiveCardDark = `${color.r - this.plugin.settings.colorDiffBetweenActive}, ${color.g - this.plugin.settings.colorDiffBetweenActive}, ${color.b - this.plugin.settings.colorDiffBetweenActive}`;
                this.plugin.saveData(this.plugin.settings)
                this.plugin.refresh();
            };
        }
    );

    new Setting(containerEl)
      .setName("Active Card Color in Light Mode")
      .setDesc("Specify active card color in light mode")
      .controlEl.createEl(
        "input",
        {
            type: "color",
            value: rgbToHex(this.plugin.settings.colorActiveCardLight)
        },
        (el) => {
            el.value = rgbToHex(this.plugin.settings.colorActiveCardLight);
            el.oninput = ({ target }) => {
                let color = hexToRgb((target as HTMLInputElement).value);

                if (!color) return;
                this.plugin.settings.colorActiveCardLight = `${color.r}, ${color.g}, ${color.b}`;
                this.plugin.settings.colorNonActiveCardLight = `${color.r - this.plugin.settings.colorDiffBetweenActive}, ${color.g - this.plugin.settings.colorDiffBetweenActive}, ${color.b - this.plugin.settings.colorDiffBetweenActive}`;                
                this.plugin.saveData(this.plugin.settings)
                this.plugin.refresh();
            };
        }
    );    

    // new Setting(containerEl)
    //   .setName('Diff Between Active & NonActive Cards')
    //   .setDesc('Spcifiy Color difference between active & non active cards. Set 0 to diable "Attention pane"')
    //   .addSlider(slider => slider
    //     .setLimits(100, 100, 5)
    //     .setValue(this.plugin.settings.colorDiffBetweenActive)
    //     .onChange((value) => {
    //       this.plugin.settings.colorDiffBetweenActive = value;
    //       let activeColorLight = hexToRgb(rgbToHex(this.plugin.settings.colorActiveCardDark));
    //       let activeColorDark = hexToRgb(rgbToHex(this.plugin.settings.colorActiveCardDark));
    //       this.plugin.settings.colorNonActiveCardLight = `${activeColorLight.r - value}, ${activeColorLight.g - value}, ${activeColorLight.b - value}`;
    //       this.plugin.settings.colorNonActiveCardDark = `${activeColorDark.r - value}, ${activeColorDark.g - value}, ${activeColorDark.b - value}`;
    //       this.plugin.saveData(this.plugin.settings);
    //       this.plugin.refresh();
    //     })
    // );

    new Setting(containerEl)
      .setName('Diff Between Active & NonActive Cards')
      .setDesc('Spcifiy Color difference between active & non active cards. Set 0 to diable "Attention pane"')
      .addText(text => text.setPlaceholder('Example: 700')
        .setValue((this.plugin.settings.colorDiffBetweenActive || '') + '')
        .setPlaceholder('defalut: 20')
        .onChange((value) => {
          let nu = Number(value)
          this.plugin.settings.colorDiffBetweenActive = nu;
          let activeColorLight = hexToRgb(rgbToHex(this.plugin.settings.colorActiveCardDark));
          let activeColorDark = hexToRgb(rgbToHex(this.plugin.settings.colorActiveCardDark));
          this.plugin.settings.colorNonActiveCardLight = `${activeColorLight.r - nu}, ${activeColorLight.g - nu}, ${activeColorLight.b - nu}`;
          this.plugin.settings.colorNonActiveCardDark = `${activeColorDark.r - nu}, ${activeColorDark.g - nu}, ${activeColorDark.b - nu}`;
          this.plugin.saveData(this.plugin.settings);
          this.plugin.refresh();
        })
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
    this.plugin.addCommand({
      id: 'toggle-card-view-mode',
      name: 'Toggle Card View',
      callback: () => {
        // switch the disabled setting and save
        this.plugin.settings.disabled = !this.plugin.settings.disabled;
        this.plugin.saveData(this.plugin.settings);

        this.plugin.settings.disabled ? this.plugin.disable() : this.plugin.enable();
      }
    });
    
    // this.addToggleSettingCommand('toggle-card-color-reverse', 'Toggle Card Colords', 'reverseColor');
    this.addToggleSettingCommand('toggle-card-title', 'Toggle Card Title', 'cardTitle');
  }
}


function hexToRgb(hex: string) {
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

    return result
        ? {
              r: parseInt(result[1], 16),
              g: parseInt(result[2], 16),
              b: parseInt(result[3], 16)
          }
        : null;
}
function componentToHex(c: number) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}
function rgbToHex(rgb: string) {
    let result = /^(\d+),\s?(\d+),\s?(\d+)/i.exec(rgb);
    if (!result || !result.length) {
        return "";
    }
    return `#${componentToHex(Number(result[1]))}${componentToHex(
        Number(result[2])
    )}${componentToHex(Number(result[3]))}`;
}
