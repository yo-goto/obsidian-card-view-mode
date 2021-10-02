import { 
  App, 
  Plugin, 
  PluginSettingTab, 
  Setting, 
} from 'obsidian';


declare class CardViewModePlugin extends Plugin {
  settings: CardViewModeSettings;
  disable(): void;
  enable(): void;
  refresh(): void;
}


export interface CardViewModeSettings {
  disabled: boolean;
  cardTitle: boolean;
  cardCornerRadius: number;
  cardTitleCornerRadius: number;
  colorBackGroundLight: string;
  colorBackGroundDark: string;
  colorActiveCardLight: string;
  colorActiveCardDark: string;
  colorNonActiveCardDark: string;
  colorNonActiveCardLight: string;
  colorTitleCardEdgeDark: string;
  colorTitleCardEdgeLight: string;
  colorTitleCardBackGroundLight: string;
  colorTitleCardBackGroundDark: string;
  colorDiffBetweenActive: number;
  colorCardBorderLight: string;
  colorCardBorderDark: string;
}

export const DEFAULT_SETTINGS: CardViewModeSettings = {
  disabled: true,
  cardTitle: false,
  cardCornerRadius: 10,
  cardTitleCornerRadius: 5,
  colorBackGroundLight: "255, 255, 255",
  colorBackGroundDark: "145, 145, 145",
  colorActiveCardLight: "255, 255, 255",
  colorActiveCardDark: "71, 71, 71",
  colorNonActiveCardDark: "71, 71, 71",
  colorNonActiveCardLight: "255, 255, 255",
  colorTitleCardEdgeDark: "227, 76, 38",
  colorTitleCardEdgeLight: "123, 230, 1",
  colorTitleCardBackGroundLight: "242, 242, 242",
  colorTitleCardBackGroundDark: "0, 0, 0",
  colorDiffBetweenActive: 0,
  colorCardBorderLight: "255, 255, 255",
  colorCardBorderDark: "0, 0, 0"
}

export class CardViewModeSettingTab extends PluginSettingTab {
  plugin: CardViewModePlugin;
  constructor(app: App, plugin: CardViewModePlugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display(): void {
    this.containerEl.empty();


    this.containerEl.createEl("h3", {
      text: "Toggle Settings",
    });
    this.addSettingToggleCardView();

    this.addSettingToggleCardTitle();
    
    this.containerEl.createEl("h3", {
      text: "Card Design",
    });
    this.addSettingCardCornerRadius();
    this.addSettingCardTitleCornerRadius();
    
    
    this.containerEl.createEl("h4", {
      text: "Dark Mode Color",
    });
    this.addSettingBackgroundColorDark();
    this.addSettingActiveCardColorDark();
    this.addSettingCardBorderColorDark();
    this.addSettingCardTitleBackgroundColorDark();
    this.addSettingCardTitleEdgeColorDark();

    // detail summary
    // this.containerEl.createEl("details", {
    //   text: ""
    // }).createEl("summary", {
    //   text: "Dark mode",
    // });
    
    

    this.containerEl.createEl("h4", {
      text: "Light Mode Color"
    });
    this.addSettingBackgroundColorLight();
    this.addSettingActiveCardColorLight();
    this.addSettingCardBorderColorLight();
    this.addSettingCardTitleBackgroundColorLight();
    this.addSettingCardTitleEdgeColorLight();


    this.containerEl.createEl("h3", {
      text: "Attention Pane",
    });
    this.addSettingDiffBetActiveNonactive();
    
  }
  
  addSettingToggleCardView(): void {
    new Setting(this.containerEl)
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
    })
    );
  }
  
  addSettingToggleCardTitle(): void {
    new Setting(this.containerEl)
      .setName("Toggle Title Card")
      .setDesc("View note titles as cards. Enable this option with Embedded Note Title Plugin.")
      .addToggle(toggle => toggle.setValue(this.plugin.settings.cardTitle)
        .onChange((value) => {
          this.plugin.settings.cardTitle = value;
          this.plugin.saveData(this.plugin.settings);
          this.plugin.refresh();
        }
      )
    );
  }
  
  addSettingCardCornerRadius(): void {
    new Setting(this.containerEl)
      .setName('Card Corner Radius')
      .setDesc('Set number to adjust card corner radius. Default radius is 10px.')
      .addText(text => text.setPlaceholder('Default: 10px')
        .setValue((this.plugin.settings.cardCornerRadius || '') + '')
        .setPlaceholder('defalut: 8')
        .onChange((value) => {
          let nu = Number(value)
          this.plugin.settings.cardCornerRadius = nu;
          this.plugin.saveData(this.plugin.settings);
          this.plugin.refresh();
        })
    );
  }

  addSettingCardTitleCornerRadius(): void {
    new Setting(this.containerEl)
      .setName('Title Card Corner Radius')
      .setDesc('Set number to adjust title card corner radius. Default radius is 5px.')
      .addText(text => text.setPlaceholder('Default: 5px')
        .setValue((this.plugin.settings.cardTitleCornerRadius || '') + '')
        .setPlaceholder('defalut: 8')
        .onChange((value) => {
          let nu = Number(value)
          this.plugin.settings.cardTitleCornerRadius = nu;
          this.plugin.saveData(this.plugin.settings);
          this.plugin.refresh();
        })
    );    
  }

  addSettingCardBorderColorLight(): void {
    new Setting(this.containerEl)
      .setName("Card Border Color")
      .setDesc("Set card border color")
      .controlEl.createEl(
        "input",
        {
            type: "color",
            value: rgbToHex(this.plugin.settings.colorCardBorderLight)
        },
        (el) => {
            el.value = rgbToHex(this.plugin.settings.colorCardBorderLight);
            el.oninput = ({ target }) => {
                let color = hexToRgb((target as HTMLInputElement).value);
  
                if (!color) return;
                this.plugin.settings.colorCardBorderLight = `${color.r}, ${color.g}, ${color.b}`;
                this.plugin.saveData(this.plugin.settings)
                this.plugin.refresh();
            };
        }
    );
  }
  
  addSettingCardBorderColorDark(): void {
    new Setting(this.containerEl)
      .setName("Card Border Color")
      .setDesc("Set card border color")
      .controlEl.createEl(
        "input",
        {
            type: "color",
            value: rgbToHex(this.plugin.settings.colorCardBorderDark)
        },
        (el) => {
            el.value = rgbToHex(this.plugin.settings.colorCardBorderDark);
            el.oninput = ({ target }) => {
                let color = hexToRgb((target as HTMLInputElement).value);

                if (!color) return;
                this.plugin.settings.colorCardBorderDark = `${color.r}, ${color.g}, ${color.b}`;
                this.plugin.saveData(this.plugin.settings)
                this.plugin.refresh();
            };
        }
    );
  }
  
  addSettingBackgroundColorLight(): void {
    new Setting(this.containerEl)
      .setName("Background Color")
      .setDesc("Set background color in light mode")
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
  }
  
  addSettingBackgroundColorDark(): void {
    new Setting(this.containerEl)
      .setName("Background Color")
      .setDesc("Set background color in dark mode")
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
  }
  
  addSettingActiveCardColorLight(): void {
    new Setting(this.containerEl)
      .setName("Active Card Color")
      .setDesc("Set active card color in light mode")
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
  }
  
  addSettingActiveCardColorDark(): void {
    new Setting(this.containerEl)
      .setName("Active Card Color")
      .setDesc("Set active card color in dark mode")
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
  }
  
  addSettingCardTitleEdgeColorDark(): void {
    new Setting(this.containerEl)
      .setName("Title Card Edge Color")
      .setDesc("Set title card edge color")
      .controlEl.createEl(
        "input",
        {
            type: "color",
            value: rgbToHex(this.plugin.settings.colorTitleCardEdgeDark)
        },
        (el) => {
            el.value = rgbToHex(this.plugin.settings.colorTitleCardEdgeDark);
            el.oninput = ({ target }) => {
                let color = hexToRgb((target as HTMLInputElement).value);

                if (!color) return;
                this.plugin.settings.colorTitleCardEdgeDark = `${color.r}, ${color.g}, ${color.b}`;
                this.plugin.saveData(this.plugin.settings)
                this.plugin.refresh();
            };
        }
    );
  }

    addSettingCardTitleEdgeColorLight(): void {
    new Setting(this.containerEl)
      .setName("Title Card Edge Color")
      .setDesc("Set title card edge color")
      .controlEl.createEl(
        "input",
        {
            type: "color",
            value: rgbToHex(this.plugin.settings.colorTitleCardEdgeLight)
        },
        (el) => {
            el.value = rgbToHex(this.plugin.settings.colorTitleCardEdgeLight);
            el.oninput = ({ target }) => {
                let color = hexToRgb((target as HTMLInputElement).value);

                if (!color) return;
                this.plugin.settings.colorTitleCardEdgeLight = `${color.r}, ${color.g}, ${color.b}`;
                this.plugin.saveData(this.plugin.settings)
                this.plugin.refresh();
            };
        }
    );
  }
  
  addSettingCardTitleBackgroundColorLight(): void{
    new Setting(this.containerEl)
      .setName("Title Card Background Color")
      .setDesc("Set title card background color")
      .controlEl.createEl(
        "input",
        {
            type: "color",
            value: rgbToHex(this.plugin.settings.colorTitleCardBackGroundLight)
        },
        (el) => {
            el.value = rgbToHex(this.plugin.settings.colorTitleCardBackGroundLight);
            el.oninput = ({ target }) => {
                let color = hexToRgb((target as HTMLInputElement).value);
  
                if (!color) return;
                this.plugin.settings.colorTitleCardBackGroundLight = `${color.r}, ${color.g}, ${color.b}`;
                this.plugin.saveData(this.plugin.settings)
                this.plugin.refresh();
            };
        }
    );
  }
  
  addSettingCardTitleBackgroundColorDark(): void {
    new Setting(this.containerEl)
      .setName("Title Card Background Color")
      .setDesc("Set title card background color")
      .controlEl.createEl(
        "input",
        {
            type: "color",
            value: rgbToHex(this.plugin.settings.colorTitleCardBackGroundDark)
        },
        (el) => {
            el.value = rgbToHex(this.plugin.settings.colorTitleCardBackGroundDark);
            el.oninput = ({ target }) => {
                let color = hexToRgb((target as HTMLInputElement).value);

                if (!color) return;
                this.plugin.settings.colorTitleCardBackGroundDark = `${color.r}, ${color.g}, ${color.b}`;
                this.plugin.saveData(this.plugin.settings)
                this.plugin.refresh();
            };
        }
    );
  }
  
      // SLIDER setting
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

  addSettingDiffBetActiveNonactive(): void {
    new Setting(this.containerEl)
      .setName('Diff Between Active & NonActive Cards')
      .setDesc('Set Color difference between active & non active cards. Set 0 to diable "Attention pane"')
      .addText(text => text.setPlaceholder('Default: 0 (Range: -255~255)')
        .setValue((this.plugin.settings.colorDiffBetweenActive || '') + '')
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

    this.addToggleSettingCommand('toggle-card-title', 'Toggle Title Card', 'cardTitle');
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
