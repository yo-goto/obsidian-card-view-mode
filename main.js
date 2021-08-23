'use strict';

var obsidian = require('obsidian');

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

var CardViewModeSettings = /** @class */ (function () {
    function CardViewModeSettings() {
        this.disabled = false;
        this.cardTitle = false;
        this.colorBackGroundLight = "rgb(255, 255, 255)";
        this.colorBackGroundDark = "rgb(94, 94, 94)";
        this.colorActiveCardLight = "rgb(255, 255, 255)";
        this.colorActiveCardDark = "rgb(71, 71, 71)";
        this.colorNonActiveCardDark = "rgb(71, 71, 71)";
        this.colorNonActiveCardLight = "rgb(255, 255, 255)";
        this.colorDiffBetweenActive = 20;
    }
    return CardViewModeSettings;
}());
var CardViewModeSettingTab = /** @class */ (function (_super) {
    __extends(CardViewModeSettingTab, _super);
    function CardViewModeSettingTab(app, plugin) {
        var _this = _super.call(this, app, plugin) || this;
        _this.plugin = plugin;
        return _this;
    }
    CardViewModeSettingTab.prototype.display = function () {
        var _this = this;
        var containerEl = this.containerEl;
        containerEl.empty();
        new obsidian.Setting(containerEl)
            .setName("Toggle Card View")
            .setDesc("Turns card view mode on or off globally")
            .addToggle(function (toggle) { return toggle.setValue(!_this.plugin.settings.disabled)
            .onChange(function (value) {
            _this.plugin.settings.disabled = !value;
            _this.plugin.saveData(_this.plugin.settings);
            if (_this.plugin.settings.disabled) {
                _this.plugin.disable();
            }
            else {
                _this.plugin.enable();
            }
        }); });
        new obsidian.Setting(containerEl)
            .setName("Toggle Card Title")
            .setDesc("Experimental: View titles as cards. Enable this option with Embedded Note Title Plugin.")
            .addToggle(function (toggle) { return toggle.setValue(_this.plugin.settings.cardTitle)
            .onChange(function (value) {
            _this.plugin.settings.cardTitle = value;
            _this.plugin.saveData(_this.plugin.settings);
            _this.plugin.refresh();
        }); });
        new obsidian.Setting(containerEl)
            .setName("Background Color in Light Mode")
            .setDesc("Specify background color in light mode")
            .controlEl.createEl("input", {
            type: "color",
            value: rgbToHex(this.plugin.settings.colorBackGroundLight)
        }, function (el) {
            el.value = rgbToHex(_this.plugin.settings.colorBackGroundLight);
            el.oninput = function (_a) {
                var target = _a.target;
                var color = hexToRgb(target.value);
                if (!color)
                    return;
                _this.plugin.settings.colorBackGroundLight = color.r + ", " + color.g + ", " + color.b;
                _this.plugin.saveData(_this.plugin.settings);
                _this.plugin.refresh();
            };
        });
        new obsidian.Setting(containerEl)
            .setName("Background Color in Dark Mode")
            .setDesc("Specify background color in dark mode")
            .controlEl.createEl("input", {
            type: "color",
            value: rgbToHex(this.plugin.settings.colorBackGroundDark)
        }, function (el) {
            el.value = rgbToHex(_this.plugin.settings.colorBackGroundDark);
            el.oninput = function (_a) {
                var target = _a.target;
                var color = hexToRgb(target.value);
                if (!color)
                    return;
                _this.plugin.settings.colorBackGroundDark = color.r + ", " + color.g + ", " + color.b;
                _this.plugin.saveData(_this.plugin.settings);
                _this.plugin.refresh();
            };
        });
        new obsidian.Setting(containerEl)
            .setName("Active Card Color in Light Mode")
            .setDesc("Specify active card color in light mode")
            .controlEl.createEl("input", {
            type: "color",
            value: rgbToHex(this.plugin.settings.colorActiveCardLight)
        }, function (el) {
            el.value = rgbToHex(_this.plugin.settings.colorActiveCardLight);
            el.oninput = function (_a) {
                var target = _a.target;
                var color = hexToRgb(target.value);
                if (!color)
                    return;
                _this.plugin.settings.colorActiveCardLight = color.r + ", " + color.g + ", " + color.b;
                _this.plugin.settings.colorNonActiveCardLight = color.r - _this.plugin.settings.colorDiffBetweenActive + ", " + (color.g - _this.plugin.settings.colorDiffBetweenActive) + ", " + (color.b - _this.plugin.settings.colorDiffBetweenActive);
                _this.plugin.saveData(_this.plugin.settings);
                _this.plugin.refresh();
            };
        });
        new obsidian.Setting(containerEl)
            .setName("Active Card Color in Dark Mode")
            .setDesc("Specify active card color in dark mode")
            .controlEl.createEl("input", {
            type: "color",
            value: rgbToHex(this.plugin.settings.colorActiveCardDark)
        }, function (el) {
            el.value = rgbToHex(_this.plugin.settings.colorActiveCardDark);
            el.oninput = function (_a) {
                var target = _a.target;
                var color = hexToRgb(target.value);
                if (!color)
                    return;
                _this.plugin.settings.colorActiveCardDark = color.r + ", " + color.g + ", " + color.b;
                _this.plugin.settings.colorNonActiveCardDark = color.r - _this.plugin.settings.colorDiffBetweenActive + ", " + (color.g - _this.plugin.settings.colorDiffBetweenActive) + ", " + (color.b - _this.plugin.settings.colorDiffBetweenActive);
                _this.plugin.saveData(_this.plugin.settings);
                _this.plugin.refresh();
            };
        });
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
        new obsidian.Setting(containerEl)
            .setName('Diff Between Active & NonActive Cards')
            .setDesc('Spcifiy Color difference between active & non active cards. Set 0 to diable "Attention pane"')
            .addText(function (text) { return text.setPlaceholder('Example: 700')
            .setValue((_this.plugin.settings.colorDiffBetweenActive || '') + '')
            .setPlaceholder('defalut: 20')
            .onChange(function (value) {
            var nu = Number(value);
            _this.plugin.settings.colorDiffBetweenActive = nu;
            var activeColorLight = hexToRgb(rgbToHex(_this.plugin.settings.colorActiveCardDark));
            var activeColorDark = hexToRgb(rgbToHex(_this.plugin.settings.colorActiveCardDark));
            _this.plugin.settings.colorNonActiveCardLight = activeColorLight.r - nu + ", " + (activeColorLight.g - nu) + ", " + (activeColorLight.b - nu);
            _this.plugin.settings.colorNonActiveCardDark = activeColorDark.r - nu + ", " + (activeColorDark.g - nu) + ", " + (activeColorDark.b - nu);
            _this.plugin.saveData(_this.plugin.settings);
            _this.plugin.refresh();
        }); });
    };
    return CardViewModeSettingTab;
}(obsidian.PluginSettingTab));
var CardViewModeCommands = /** @class */ (function () {
    function CardViewModeCommands(plugin) {
        this.plugin = plugin;
    }
    CardViewModeCommands.prototype.addToggleSettingCommand = function (id, name, settingName) {
        var _this = this;
        this.plugin.addCommand({
            id: id,
            name: name,
            callback: function () {
                // switch the setting, save and refresh
                //@ts-ignore
                _this.plugin.settings[settingName] = !_this.plugin.settings[settingName];
                _this.plugin.saveData(_this.plugin.settings);
                _this.plugin.refresh();
            }
        });
    };
    CardViewModeCommands.prototype.addCommands = function () {
        var _this = this;
        this.plugin.addCommand({
            id: 'toggle-card-view-mode',
            name: 'Toggle Card View',
            callback: function () {
                // switch the disabled setting and save
                _this.plugin.settings.disabled = !_this.plugin.settings.disabled;
                _this.plugin.saveData(_this.plugin.settings);
                _this.plugin.settings.disabled ? _this.plugin.disable() : _this.plugin.enable();
            }
        });
        this.addToggleSettingCommand('toggle-card-title', 'Toggle Card Title', 'cardTitle');
    };
    return CardViewModeCommands;
}());
function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
        ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        }
        : null;
}
function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}
function rgbToHex(rgb) {
    var result = /^(\d+),\s?(\d+),\s?(\d+)/i.exec(rgb);
    if (!result || !result.length) {
        return "";
    }
    return "#" + componentToHex(Number(result[1])) + componentToHex(Number(result[2])) + componentToHex(Number(result[3]));
}

var CardViewModePlugin = /** @class */ (function (_super) {
    __extends(CardViewModePlugin, _super);
    function CardViewModePlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.enable = function () {
            _this.registerEvent(_this.app.workspace.on('resize', _this.handleResize));
            _this.app.workspace.layoutReady ? _this.reallyEnable() : _this.app.workspace.on('layout-change', _this.reallyEnable);
        };
        _this.reallyEnable = function () {
            _this.app.workspace.off('layout-ready', _this.reallyEnable);
            _this.addStyle();
            _this.observeLeafWidth();
        };
        _this.disable = function () {
            _this.removeStyle();
        };
        _this.refresh = function () {
            _this.updateStyle();
            _this.observeLeafWidth();
        };
        _this.removeStyle = function () {
            // const el = document.getElementById('plugin-card-view-mode');
            // if (el) el.remove();
            document.body.classList.remove('plugin-card-view-mode');
            document.body.classList.remove('plugin-card-view-mode-cardtitle');
            // document.body.removeClass('plugin-card-view-mode', 'plugin-card-view-mode-cardtitle');
        };
        _this.addStyle = function () {
            // const css = document.createElement('style');
            // css.id = 'plugin-card-view-mode-cardtitle';
            // document.getElementsByTagName("head")[0].appendChild(css);
            // document.body.classList.add('plugin-card-view-mode');
            // this.updateStyle();
            var css = document.createElement('style');
            css.id = 'plugin-card-view-mode';
            document.getElementsByTagName("head")[0].appendChild(css);
            document.body.classList.add('plugin-card-view-mode');
            document.body.classList.add('plugin-card-view-mode-cardtitle');
            _this.updateStyle();
        };
        _this.updateStyle = function () {
            // 1. remove style before changing
            // this.removeStyle();
            // これやるとスタイル更新されない
            // 2-a. update boolean settings
            document.body.classList.toggle('plugin-card-view-mode-cardtitle', _this.settings.cardTitle);
            // 2-b. updaate custom css properties
            var el = document.getElementById('plugin-card-view-mode');
            if (!el)
                throw "plugin-card-view-mode element not found!";
            else {
                el.innerText = "\n        body.plugin-card-view-mode.theme-light{\n          --cardview-card-color-active: rgb(" + _this.settings.colorActiveCardLight + ");\n          --cardview-card-color-non-active: rgb(" + _this.settings.colorNonActiveCardLight + ");\n          --cardview-background-color-default: rgb(" + _this.settings.colorBackGroundLight + ");\n        }\n        body.plugin-card-view-mode.theme-dark{\n          --cardview-card-color-active: rgb(" + _this.settings.colorActiveCardDark + ");\n          --cardview-card-color-non-active: rgb(" + _this.settings.colorNonActiveCardDark + ");\n          --cardview-background-color-default: rgb(" + _this.settings.colorBackGroundDark + ");\n        }\n        ";
            }
        };
        _this.handleResize = function () {
            if (_this.app.workspace.layoutReady) {
                _this.observeLeafWidth();
            }
        };
        _this.observeLeafWidth = function () {
            var cardTitleWidthList = document.querySelectorAll('.embedded-note-titles .CodeMirror-scroll>h1[id*="title-"]');
            var paneLeafWidth = document.querySelectorAll('.CodeMirror-sizer .CodeMirror-lines>div[role="presentation"]');
            var resizeObserver = new ResizeObserver(function (entries) {
                for (var i = 0; i < entries.length; i++) {
                    var entry = entries[i];
                    if (entry.contentRect) {
                        cardTitleWidthList[i].style.width = String(entry.contentRect.width + 6) + "px";
                    }
                }
            });
            for (var k = 0; k < paneLeafWidth.length; k++) {
                resizeObserver.observe(paneLeafWidth[k]);
            }
        };
        return _this;
    }
    CardViewModePlugin.prototype.onload = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _a = this;
                        _c = (_b = Object).assign;
                        _d = [new CardViewModeSettings()];
                        return [4 /*yield*/, this.loadData()];
                    case 1:
                        _a.settings = _c.apply(_b, _d.concat([_e.sent()]));
                        if (!this.settings.disabled)
                            this.enable();
                        this.addSettingTab(new CardViewModeSettingTab(this.app, this));
                        new CardViewModeCommands(this).addCommands();
                        return [2 /*return*/];
                }
            });
        });
    };
    CardViewModePlugin.prototype.onunload = function () {
        this.disable();
    };
    return CardViewModePlugin;
}(obsidian.Plugin));

module.exports = CardViewModePlugin;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsibm9kZV9tb2R1bGVzL3RzbGliL3RzbGliLmVzNi5qcyIsInNyYy9zZXR0aW5ncy50cyIsInNyYy9tYWluLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qISAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5Db3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi5cclxuXHJcblBlcm1pc3Npb24gdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZC9vciBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmUgZm9yIGFueVxyXG5wdXJwb3NlIHdpdGggb3Igd2l0aG91dCBmZWUgaXMgaGVyZWJ5IGdyYW50ZWQuXHJcblxyXG5USEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiIEFORCBUSEUgQVVUSE9SIERJU0NMQUlNUyBBTEwgV0FSUkFOVElFUyBXSVRIXHJcblJFR0FSRCBUTyBUSElTIFNPRlRXQVJFIElOQ0xVRElORyBBTEwgSU1QTElFRCBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWVxyXG5BTkQgRklUTkVTUy4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUiBCRSBMSUFCTEUgRk9SIEFOWSBTUEVDSUFMLCBESVJFQ1QsXHJcbklORElSRUNULCBPUiBDT05TRVFVRU5USUFMIERBTUFHRVMgT1IgQU5ZIERBTUFHRVMgV0hBVFNPRVZFUiBSRVNVTFRJTkcgRlJPTVxyXG5MT1NTIE9GIFVTRSwgREFUQSBPUiBQUk9GSVRTLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgTkVHTElHRU5DRSBPUlxyXG5PVEhFUiBUT1JUSU9VUyBBQ1RJT04sIEFSSVNJTkcgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgVVNFIE9SXHJcblBFUkZPUk1BTkNFIE9GIFRISVMgU09GVFdBUkUuXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXHJcbi8qIGdsb2JhbCBSZWZsZWN0LCBQcm9taXNlICovXHJcblxyXG52YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGIsIHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXh0ZW5kcyhkLCBiKSB7XHJcbiAgICBpZiAodHlwZW9mIGIgIT09IFwiZnVuY3Rpb25cIiAmJiBiICE9PSBudWxsKVxyXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDbGFzcyBleHRlbmRzIHZhbHVlIFwiICsgU3RyaW5nKGIpICsgXCIgaXMgbm90IGEgY29uc3RydWN0b3Igb3IgbnVsbFwiKTtcclxuICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxufVxyXG5cclxuZXhwb3J0IHZhciBfX2Fzc2lnbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uIF9fYXNzaWduKHQpIHtcclxuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKSB0W3BdID0gc1twXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVzdChzLCBlKSB7XHJcbiAgICB2YXIgdCA9IHt9O1xyXG4gICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXHJcbiAgICAgICAgdFtwXSA9IHNbcF07XHJcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoZS5pbmRleE9mKHBbaV0pIDwgMCAmJiBPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwocywgcFtpXSkpXHJcbiAgICAgICAgICAgICAgICB0W3BbaV1dID0gc1twW2ldXTtcclxuICAgICAgICB9XHJcbiAgICByZXR1cm4gdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcclxuICAgIHZhciBjID0gYXJndW1lbnRzLmxlbmd0aCwgciA9IGMgPCAzID8gdGFyZ2V0IDogZGVzYyA9PT0gbnVsbCA/IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSA6IGRlc2MsIGQ7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QuZGVjb3JhdGUgPT09IFwiZnVuY3Rpb25cIikgciA9IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpO1xyXG4gICAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcclxuICAgIHJldHVybiBjID4gMyAmJiByICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgciksIHI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3BhcmFtKHBhcmFtSW5kZXgsIGRlY29yYXRvcikge1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQsIGtleSkgeyBkZWNvcmF0b3IodGFyZ2V0LCBrZXksIHBhcmFtSW5kZXgpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKSB7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QubWV0YWRhdGEgPT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIFJlZmxlY3QubWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdGVyKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xyXG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZ2VuZXJhdG9yKHRoaXNBcmcsIGJvZHkpIHtcclxuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7XHJcbiAgICByZXR1cm4gZyA9IHsgbmV4dDogdmVyYigwKSwgXCJ0aHJvd1wiOiB2ZXJiKDEpLCBcInJldHVyblwiOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xyXG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcclxuICAgICAgICB3aGlsZSAoXykgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xyXG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XHJcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxyXG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgdmFyIF9fY3JlYXRlQmluZGluZyA9IE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcclxuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgazIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIG1ba107IH0gfSk7XHJcbn0pIDogKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XHJcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xyXG4gICAgb1trMl0gPSBtW2tdO1xyXG59KTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4cG9ydFN0YXIobSwgbykge1xyXG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAocCAhPT0gXCJkZWZhdWx0XCIgJiYgIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvLCBwKSkgX19jcmVhdGVCaW5kaW5nKG8sIG0sIHApO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX192YWx1ZXMobykge1xyXG4gICAgdmFyIHMgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgU3ltYm9sLml0ZXJhdG9yLCBtID0gcyAmJiBvW3NdLCBpID0gMDtcclxuICAgIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pO1xyXG4gICAgaWYgKG8gJiYgdHlwZW9mIG8ubGVuZ3RoID09PSBcIm51bWJlclwiKSByZXR1cm4ge1xyXG4gICAgICAgIG5leHQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKG8gJiYgaSA+PSBvLmxlbmd0aCkgbyA9IHZvaWQgMDtcclxuICAgICAgICAgICAgcmV0dXJuIHsgdmFsdWU6IG8gJiYgb1tpKytdLCBkb25lOiAhbyB9O1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKHMgPyBcIk9iamVjdCBpcyBub3QgaXRlcmFibGUuXCIgOiBcIlN5bWJvbC5pdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3JlYWQobywgbikge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdO1xyXG4gICAgaWYgKCFtKSByZXR1cm4gbztcclxuICAgIHZhciBpID0gbS5jYWxsKG8pLCByLCBhciA9IFtdLCBlO1xyXG4gICAgdHJ5IHtcclxuICAgICAgICB3aGlsZSAoKG4gPT09IHZvaWQgMCB8fCBuLS0gPiAwKSAmJiAhKHIgPSBpLm5leHQoKSkuZG9uZSkgYXIucHVzaChyLnZhbHVlKTtcclxuICAgIH1cclxuICAgIGNhdGNoIChlcnJvcikgeyBlID0geyBlcnJvcjogZXJyb3IgfTsgfVxyXG4gICAgZmluYWxseSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKHIgJiYgIXIuZG9uZSAmJiAobSA9IGlbXCJyZXR1cm5cIl0pKSBtLmNhbGwoaSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZpbmFsbHkgeyBpZiAoZSkgdGhyb3cgZS5lcnJvcjsgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG4vKiogQGRlcHJlY2F0ZWQgKi9cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkKCkge1xyXG4gICAgZm9yICh2YXIgYXIgPSBbXSwgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspXHJcbiAgICAgICAgYXIgPSBhci5jb25jYXQoX19yZWFkKGFyZ3VtZW50c1tpXSkpO1xyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG4vKiogQGRlcHJlY2F0ZWQgKi9cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkQXJyYXlzKCkge1xyXG4gICAgZm9yICh2YXIgcyA9IDAsIGkgPSAwLCBpbCA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBpbDsgaSsrKSBzICs9IGFyZ3VtZW50c1tpXS5sZW5ndGg7XHJcbiAgICBmb3IgKHZhciByID0gQXJyYXkocyksIGsgPSAwLCBpID0gMDsgaSA8IGlsOyBpKyspXHJcbiAgICAgICAgZm9yICh2YXIgYSA9IGFyZ3VtZW50c1tpXSwgaiA9IDAsIGpsID0gYS5sZW5ndGg7IGogPCBqbDsgaisrLCBrKyspXHJcbiAgICAgICAgICAgIHJba10gPSBhW2pdO1xyXG4gICAgcmV0dXJuIHI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZEFycmF5KHRvLCBmcm9tLCBwYWNrKSB7XHJcbiAgICBpZiAocGFjayB8fCBhcmd1bWVudHMubGVuZ3RoID09PSAyKSBmb3IgKHZhciBpID0gMCwgbCA9IGZyb20ubGVuZ3RoLCBhcjsgaSA8IGw7IGkrKykge1xyXG4gICAgICAgIGlmIChhciB8fCAhKGkgaW4gZnJvbSkpIHtcclxuICAgICAgICAgICAgaWYgKCFhcikgYXIgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChmcm9tLCAwLCBpKTtcclxuICAgICAgICAgICAgYXJbaV0gPSBmcm9tW2ldO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiB0by5jb25jYXQoYXIgfHwgZnJvbSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0KHYpIHtcclxuICAgIHJldHVybiB0aGlzIGluc3RhbmNlb2YgX19hd2FpdCA/ICh0aGlzLnYgPSB2LCB0aGlzKSA6IG5ldyBfX2F3YWl0KHYpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0dlbmVyYXRvcih0aGlzQXJnLCBfYXJndW1lbnRzLCBnZW5lcmF0b3IpIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgZyA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSwgaSwgcSA9IFtdO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlmIChnW25dKSBpW25dID0gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChhLCBiKSB7IHEucHVzaChbbiwgdiwgYSwgYl0pID4gMSB8fCByZXN1bWUobiwgdik7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiByZXN1bWUobiwgdikgeyB0cnkgeyBzdGVwKGdbbl0odikpOyB9IGNhdGNoIChlKSB7IHNldHRsZShxWzBdWzNdLCBlKTsgfSB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKHIpIHsgci52YWx1ZSBpbnN0YW5jZW9mIF9fYXdhaXQgPyBQcm9taXNlLnJlc29sdmUoci52YWx1ZS52KS50aGVuKGZ1bGZpbGwsIHJlamVjdCkgOiBzZXR0bGUocVswXVsyXSwgcik7IH1cclxuICAgIGZ1bmN0aW9uIGZ1bGZpbGwodmFsdWUpIHsgcmVzdW1lKFwibmV4dFwiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHJlamVjdCh2YWx1ZSkgeyByZXN1bWUoXCJ0aHJvd1wiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShmLCB2KSB7IGlmIChmKHYpLCBxLnNoaWZ0KCksIHEubGVuZ3RoKSByZXN1bWUocVswXVswXSwgcVswXVsxXSk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNEZWxlZ2F0b3Iobykge1xyXG4gICAgdmFyIGksIHA7XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIsIGZ1bmN0aW9uIChlKSB7IHRocm93IGU7IH0pLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuLCBmKSB7IGlbbl0gPSBvW25dID8gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIChwID0gIXApID8geyB2YWx1ZTogX19hd2FpdChvW25dKHYpKSwgZG9uZTogbiA9PT0gXCJyZXR1cm5cIiB9IDogZiA/IGYodikgOiB2OyB9IDogZjsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY1ZhbHVlcyhvKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIG0gPSBvW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSwgaTtcclxuICAgIHJldHVybiBtID8gbS5jYWxsKG8pIDogKG8gPSB0eXBlb2YgX192YWx1ZXMgPT09IFwiZnVuY3Rpb25cIiA/IF9fdmFsdWVzKG8pIDogb1tTeW1ib2wuaXRlcmF0b3JdKCksIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpKTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpW25dID0gb1tuXSAmJiBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkgeyB2ID0gb1tuXSh2KSwgc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgdi5kb25lLCB2LnZhbHVlKTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShyZXNvbHZlLCByZWplY3QsIGQsIHYpIHsgUHJvbWlzZS5yZXNvbHZlKHYpLnRoZW4oZnVuY3Rpb24odikgeyByZXNvbHZlKHsgdmFsdWU6IHYsIGRvbmU6IGQgfSk7IH0sIHJlamVjdCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWFrZVRlbXBsYXRlT2JqZWN0KGNvb2tlZCwgcmF3KSB7XHJcbiAgICBpZiAoT2JqZWN0LmRlZmluZVByb3BlcnR5KSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb29rZWQsIFwicmF3XCIsIHsgdmFsdWU6IHJhdyB9KTsgfSBlbHNlIHsgY29va2VkLnJhdyA9IHJhdzsgfVxyXG4gICAgcmV0dXJuIGNvb2tlZDtcclxufTtcclxuXHJcbnZhciBfX3NldE1vZHVsZURlZmF1bHQgPSBPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIHYpIHtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBcImRlZmF1bHRcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdiB9KTtcclxufSkgOiBmdW5jdGlvbihvLCB2KSB7XHJcbiAgICBvW1wiZGVmYXVsdFwiXSA9IHY7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnRTdGFyKG1vZCkge1xyXG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcclxuICAgIHZhciByZXN1bHQgPSB7fTtcclxuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChrICE9PSBcImRlZmF1bHRcIiAmJiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9kLCBrKSkgX19jcmVhdGVCaW5kaW5nKHJlc3VsdCwgbW9kLCBrKTtcclxuICAgIF9fc2V0TW9kdWxlRGVmYXVsdChyZXN1bHQsIG1vZCk7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnREZWZhdWx0KG1vZCkge1xyXG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBkZWZhdWx0OiBtb2QgfTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fY2xhc3NQcml2YXRlRmllbGRHZXQocmVjZWl2ZXIsIHN0YXRlLCBraW5kLCBmKSB7XHJcbiAgICBpZiAoa2luZCA9PT0gXCJhXCIgJiYgIWYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJQcml2YXRlIGFjY2Vzc29yIHdhcyBkZWZpbmVkIHdpdGhvdXQgYSBnZXR0ZXJcIik7XHJcbiAgICBpZiAodHlwZW9mIHN0YXRlID09PSBcImZ1bmN0aW9uXCIgPyByZWNlaXZlciAhPT0gc3RhdGUgfHwgIWYgOiAhc3RhdGUuaGFzKHJlY2VpdmVyKSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCByZWFkIHByaXZhdGUgbWVtYmVyIGZyb20gYW4gb2JqZWN0IHdob3NlIGNsYXNzIGRpZCBub3QgZGVjbGFyZSBpdFwiKTtcclxuICAgIHJldHVybiBraW5kID09PSBcIm1cIiA/IGYgOiBraW5kID09PSBcImFcIiA/IGYuY2FsbChyZWNlaXZlcikgOiBmID8gZi52YWx1ZSA6IHN0YXRlLmdldChyZWNlaXZlcik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2NsYXNzUHJpdmF0ZUZpZWxkU2V0KHJlY2VpdmVyLCBzdGF0ZSwgdmFsdWUsIGtpbmQsIGYpIHtcclxuICAgIGlmIChraW5kID09PSBcIm1cIikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlByaXZhdGUgbWV0aG9kIGlzIG5vdCB3cml0YWJsZVwiKTtcclxuICAgIGlmIChraW5kID09PSBcImFcIiAmJiAhZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlByaXZhdGUgYWNjZXNzb3Igd2FzIGRlZmluZWQgd2l0aG91dCBhIHNldHRlclwiKTtcclxuICAgIGlmICh0eXBlb2Ygc3RhdGUgPT09IFwiZnVuY3Rpb25cIiA/IHJlY2VpdmVyICE9PSBzdGF0ZSB8fCAhZiA6ICFzdGF0ZS5oYXMocmVjZWl2ZXIpKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IHdyaXRlIHByaXZhdGUgbWVtYmVyIHRvIGFuIG9iamVjdCB3aG9zZSBjbGFzcyBkaWQgbm90IGRlY2xhcmUgaXRcIik7XHJcbiAgICByZXR1cm4gKGtpbmQgPT09IFwiYVwiID8gZi5jYWxsKHJlY2VpdmVyLCB2YWx1ZSkgOiBmID8gZi52YWx1ZSA9IHZhbHVlIDogc3RhdGUuc2V0KHJlY2VpdmVyLCB2YWx1ZSkpLCB2YWx1ZTtcclxufVxyXG4iLCJpbXBvcnQgeyBcbiAgQXBwLCBcbiAgUGx1Z2luLCBcbiAgUGx1Z2luU2V0dGluZ1RhYiwgXG4gIFNldHRpbmcsIFxufSBmcm9tICdvYnNpZGlhbic7XG5cblxuZGVjbGFyZSBjbGFzcyBDYXJkVmlld01vZGVQbHVnaW4gZXh0ZW5kcyBQbHVnaW4ge1xuICBzZXR0aW5nczogQ2FyZFZpZXdNb2RlU2V0dGluZ3M7XG4gIGRpc2FibGUoKTogdm9pZDtcbiAgZW5hYmxlKCk6IHZvaWQ7XG4gIHJlZnJlc2goKTogdm9pZDtcbn1cblxuZXhwb3J0IGNsYXNzIENhcmRWaWV3TW9kZVNldHRpbmdzIHtcbiAgZGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgY2FyZFRpdGxlOiBib29sZWFuID0gZmFsc2U7XG4gIGNvbG9yQmFja0dyb3VuZExpZ2h0OiBzdHJpbmcgPSBcInJnYigyNTUsIDI1NSwgMjU1KVwiO1xuICBjb2xvckJhY2tHcm91bmREYXJrOiBzdHJpbmcgPSBcInJnYig5NCwgOTQsIDk0KVwiO1xuICBjb2xvckFjdGl2ZUNhcmRMaWdodDogc3RyaW5nID0gXCJyZ2IoMjU1LCAyNTUsIDI1NSlcIjtcbiAgY29sb3JBY3RpdmVDYXJkRGFyazogc3RyaW5nID0gXCJyZ2IoNzEsIDcxLCA3MSlcIjtcbiAgY29sb3JOb25BY3RpdmVDYXJkRGFyazogc3RyaW5nID0gXCJyZ2IoNzEsIDcxLCA3MSlcIjtcbiAgY29sb3JOb25BY3RpdmVDYXJkTGlnaHQ6IHN0cmluZyA9IFwicmdiKDI1NSwgMjU1LCAyNTUpXCI7XG4gIGNvbG9yRGlmZkJldHdlZW5BY3RpdmU6IG51bWJlciA9IDIwO1xufVxuXG5leHBvcnQgY2xhc3MgQ2FyZFZpZXdNb2RlU2V0dGluZ1RhYiBleHRlbmRzIFBsdWdpblNldHRpbmdUYWIge1xuICBwbHVnaW46IENhcmRWaWV3TW9kZVBsdWdpbjtcbiAgY29uc3RydWN0b3IoYXBwOiBBcHAsIHBsdWdpbjogQ2FyZFZpZXdNb2RlUGx1Z2luKSB7XG4gICAgc3VwZXIoYXBwLCBwbHVnaW4pO1xuICAgIHRoaXMucGx1Z2luID0gcGx1Z2luO1xuICB9XG5cbiAgZGlzcGxheSgpOiB2b2lkIHtcbiAgICBsZXQgeyBjb250YWluZXJFbCB9ID0gdGhpcztcblxuICAgIGNvbnRhaW5lckVsLmVtcHR5KCk7XG5cbiAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcbiAgICAgIC5zZXROYW1lKFwiVG9nZ2xlIENhcmQgVmlld1wiKVxuICAgICAgLnNldERlc2MoXCJUdXJucyBjYXJkIHZpZXcgbW9kZSBvbiBvciBvZmYgZ2xvYmFsbHlcIilcbiAgICAgIC5hZGRUb2dnbGUodG9nZ2xlID0+IHRvZ2dsZS5zZXRWYWx1ZSghdGhpcy5wbHVnaW4uc2V0dGluZ3MuZGlzYWJsZWQpXG4gICAgICAgIC5vbkNoYW5nZSgodmFsdWUpID0+IHtcbiAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5kaXNhYmxlZCA9ICF2YWx1ZTtcbiAgICAgICAgICB0aGlzLnBsdWdpbi5zYXZlRGF0YSh0aGlzLnBsdWdpbi5zZXR0aW5ncyk7XG4gICAgICAgICAgaWYgKHRoaXMucGx1Z2luLnNldHRpbmdzLmRpc2FibGVkKSB7XG4gICAgICAgICAgICB0aGlzLnBsdWdpbi5kaXNhYmxlKCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5wbHVnaW4uZW5hYmxlKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICApXG4gICAgKTtcblxuICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuICAgICAgLnNldE5hbWUoXCJUb2dnbGUgQ2FyZCBUaXRsZVwiKVxuICAgICAgLnNldERlc2MoXCJFeHBlcmltZW50YWw6IFZpZXcgdGl0bGVzIGFzIGNhcmRzLiBFbmFibGUgdGhpcyBvcHRpb24gd2l0aCBFbWJlZGRlZCBOb3RlIFRpdGxlIFBsdWdpbi5cIilcbiAgICAgIC5hZGRUb2dnbGUodG9nZ2xlID0+IHRvZ2dsZS5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy5jYXJkVGl0bGUpXG4gICAgICAgIC5vbkNoYW5nZSgodmFsdWUpID0+IHtcbiAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5jYXJkVGl0bGUgPSB2YWx1ZTtcbiAgICAgICAgICB0aGlzLnBsdWdpbi5zYXZlRGF0YSh0aGlzLnBsdWdpbi5zZXR0aW5ncyk7XG4gICAgICAgICAgdGhpcy5wbHVnaW4ucmVmcmVzaCgpO1xuICAgICAgICB9XG4gICAgICApXG4gICAgKTtcblxuXG4gICAgbmV3IFNldHRpbmcoY29udGFpbmVyRWwpXG4gICAgICAuc2V0TmFtZShcIkJhY2tncm91bmQgQ29sb3IgaW4gTGlnaHQgTW9kZVwiKVxuICAgICAgLnNldERlc2MoXCJTcGVjaWZ5IGJhY2tncm91bmQgY29sb3IgaW4gbGlnaHQgbW9kZVwiKVxuICAgICAgLmNvbnRyb2xFbC5jcmVhdGVFbChcbiAgICAgICAgXCJpbnB1dFwiLFxuICAgICAgICB7XG4gICAgICAgICAgICB0eXBlOiBcImNvbG9yXCIsXG4gICAgICAgICAgICB2YWx1ZTogcmdiVG9IZXgodGhpcy5wbHVnaW4uc2V0dGluZ3MuY29sb3JCYWNrR3JvdW5kTGlnaHQpXG4gICAgICAgIH0sXG4gICAgICAgIChlbCkgPT4ge1xuICAgICAgICAgICAgZWwudmFsdWUgPSByZ2JUb0hleCh0aGlzLnBsdWdpbi5zZXR0aW5ncy5jb2xvckJhY2tHcm91bmRMaWdodCk7XG4gICAgICAgICAgICBlbC5vbmlucHV0ID0gKHsgdGFyZ2V0IH0pID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgY29sb3IgPSBoZXhUb1JnYigodGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnQpLnZhbHVlKTtcblxuICAgICAgICAgICAgICAgIGlmICghY29sb3IpIHJldHVybjtcbiAgICAgICAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5jb2xvckJhY2tHcm91bmRMaWdodCA9IGAke2NvbG9yLnJ9LCAke2NvbG9yLmd9LCAke2NvbG9yLmJ9YDtcbiAgICAgICAgICAgICAgICB0aGlzLnBsdWdpbi5zYXZlRGF0YSh0aGlzLnBsdWdpbi5zZXR0aW5ncylcbiAgICAgICAgICAgICAgICB0aGlzLnBsdWdpbi5yZWZyZXNoKCk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgKTtcbiAgICBcbiAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcbiAgICAgIC5zZXROYW1lKFwiQmFja2dyb3VuZCBDb2xvciBpbiBEYXJrIE1vZGVcIilcbiAgICAgIC5zZXREZXNjKFwiU3BlY2lmeSBiYWNrZ3JvdW5kIGNvbG9yIGluIGRhcmsgbW9kZVwiKVxuICAgICAgLmNvbnRyb2xFbC5jcmVhdGVFbChcbiAgICAgICAgXCJpbnB1dFwiLFxuICAgICAgICB7XG4gICAgICAgICAgICB0eXBlOiBcImNvbG9yXCIsXG4gICAgICAgICAgICB2YWx1ZTogcmdiVG9IZXgodGhpcy5wbHVnaW4uc2V0dGluZ3MuY29sb3JCYWNrR3JvdW5kRGFyaylcbiAgICAgICAgfSxcbiAgICAgICAgKGVsKSA9PiB7XG4gICAgICAgICAgICBlbC52YWx1ZSA9IHJnYlRvSGV4KHRoaXMucGx1Z2luLnNldHRpbmdzLmNvbG9yQmFja0dyb3VuZERhcmspO1xuICAgICAgICAgICAgZWwub25pbnB1dCA9ICh7IHRhcmdldCB9KSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGNvbG9yID0gaGV4VG9SZ2IoKHRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50KS52YWx1ZSk7XG5cbiAgICAgICAgICAgICAgICBpZiAoIWNvbG9yKSByZXR1cm47XG4gICAgICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3MuY29sb3JCYWNrR3JvdW5kRGFyayA9IGAke2NvbG9yLnJ9LCAke2NvbG9yLmd9LCAke2NvbG9yLmJ9YDtcbiAgICAgICAgICAgICAgICB0aGlzLnBsdWdpbi5zYXZlRGF0YSh0aGlzLnBsdWdpbi5zZXR0aW5ncylcbiAgICAgICAgICAgICAgICB0aGlzLnBsdWdpbi5yZWZyZXNoKCk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgKTtcblxuICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuICAgICAgLnNldE5hbWUoXCJBY3RpdmUgQ2FyZCBDb2xvciBpbiBMaWdodCBNb2RlXCIpXG4gICAgICAuc2V0RGVzYyhcIlNwZWNpZnkgYWN0aXZlIGNhcmQgY29sb3IgaW4gbGlnaHQgbW9kZVwiKVxuICAgICAgLmNvbnRyb2xFbC5jcmVhdGVFbChcbiAgICAgICAgXCJpbnB1dFwiLFxuICAgICAgICB7XG4gICAgICAgICAgICB0eXBlOiBcImNvbG9yXCIsXG4gICAgICAgICAgICB2YWx1ZTogcmdiVG9IZXgodGhpcy5wbHVnaW4uc2V0dGluZ3MuY29sb3JBY3RpdmVDYXJkTGlnaHQpXG4gICAgICAgIH0sXG4gICAgICAgIChlbCkgPT4ge1xuICAgICAgICAgICAgZWwudmFsdWUgPSByZ2JUb0hleCh0aGlzLnBsdWdpbi5zZXR0aW5ncy5jb2xvckFjdGl2ZUNhcmRMaWdodCk7XG4gICAgICAgICAgICBlbC5vbmlucHV0ID0gKHsgdGFyZ2V0IH0pID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgY29sb3IgPSBoZXhUb1JnYigodGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnQpLnZhbHVlKTtcblxuICAgICAgICAgICAgICAgIGlmICghY29sb3IpIHJldHVybjtcbiAgICAgICAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5jb2xvckFjdGl2ZUNhcmRMaWdodCA9IGAke2NvbG9yLnJ9LCAke2NvbG9yLmd9LCAke2NvbG9yLmJ9YDtcbiAgICAgICAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5jb2xvck5vbkFjdGl2ZUNhcmRMaWdodCA9IGAke2NvbG9yLnIgLSB0aGlzLnBsdWdpbi5zZXR0aW5ncy5jb2xvckRpZmZCZXR3ZWVuQWN0aXZlfSwgJHtjb2xvci5nIC0gdGhpcy5wbHVnaW4uc2V0dGluZ3MuY29sb3JEaWZmQmV0d2VlbkFjdGl2ZX0sICR7Y29sb3IuYiAtIHRoaXMucGx1Z2luLnNldHRpbmdzLmNvbG9yRGlmZkJldHdlZW5BY3RpdmV9YDsgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2F2ZURhdGEodGhpcy5wbHVnaW4uc2V0dGluZ3MpXG4gICAgICAgICAgICAgICAgdGhpcy5wbHVnaW4ucmVmcmVzaCgpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICk7ICAgIFxuXG4gICAgbmV3IFNldHRpbmcoY29udGFpbmVyRWwpXG4gICAgICAuc2V0TmFtZShcIkFjdGl2ZSBDYXJkIENvbG9yIGluIERhcmsgTW9kZVwiKVxuICAgICAgLnNldERlc2MoXCJTcGVjaWZ5IGFjdGl2ZSBjYXJkIGNvbG9yIGluIGRhcmsgbW9kZVwiKVxuICAgICAgLmNvbnRyb2xFbC5jcmVhdGVFbChcbiAgICAgICAgXCJpbnB1dFwiLFxuICAgICAgICB7XG4gICAgICAgICAgICB0eXBlOiBcImNvbG9yXCIsXG4gICAgICAgICAgICB2YWx1ZTogcmdiVG9IZXgodGhpcy5wbHVnaW4uc2V0dGluZ3MuY29sb3JBY3RpdmVDYXJkRGFyaylcbiAgICAgICAgfSxcbiAgICAgICAgKGVsKSA9PiB7XG4gICAgICAgICAgICBlbC52YWx1ZSA9IHJnYlRvSGV4KHRoaXMucGx1Z2luLnNldHRpbmdzLmNvbG9yQWN0aXZlQ2FyZERhcmspO1xuICAgICAgICAgICAgZWwub25pbnB1dCA9ICh7IHRhcmdldCB9KSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGNvbG9yID0gaGV4VG9SZ2IoKHRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50KS52YWx1ZSk7XG5cbiAgICAgICAgICAgICAgICBpZiAoIWNvbG9yKSByZXR1cm47XG4gICAgICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3MuY29sb3JBY3RpdmVDYXJkRGFyayA9IGAke2NvbG9yLnJ9LCAke2NvbG9yLmd9LCAke2NvbG9yLmJ9YDtcbiAgICAgICAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5jb2xvck5vbkFjdGl2ZUNhcmREYXJrID0gYCR7Y29sb3IuciAtIHRoaXMucGx1Z2luLnNldHRpbmdzLmNvbG9yRGlmZkJldHdlZW5BY3RpdmV9LCAke2NvbG9yLmcgLSB0aGlzLnBsdWdpbi5zZXR0aW5ncy5jb2xvckRpZmZCZXR3ZWVuQWN0aXZlfSwgJHtjb2xvci5iIC0gdGhpcy5wbHVnaW4uc2V0dGluZ3MuY29sb3JEaWZmQmV0d2VlbkFjdGl2ZX1gO1xuICAgICAgICAgICAgICAgIHRoaXMucGx1Z2luLnNhdmVEYXRhKHRoaXMucGx1Z2luLnNldHRpbmdzKVxuICAgICAgICAgICAgICAgIHRoaXMucGx1Z2luLnJlZnJlc2goKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICApO1xuXG5cbiAgICAvLyBTTElERVIgc2V0dGluZ1xuICAgIC8vIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuICAgIC8vICAgLnNldE5hbWUoJ0RpZmYgQmV0d2VlbiBBY3RpdmUgJiBOb25BY3RpdmUgQ2FyZHMnKVxuICAgIC8vICAgLnNldERlc2MoJ1NwY2lmaXkgQ29sb3IgZGlmZmVyZW5jZSBiZXR3ZWVuIGFjdGl2ZSAmIG5vbiBhY3RpdmUgY2FyZHMuIFNldCAwIHRvIGRpYWJsZSBcIkF0dGVudGlvbiBwYW5lXCInKVxuICAgIC8vICAgLmFkZFNsaWRlcihzbGlkZXIgPT4gc2xpZGVyXG4gICAgLy8gICAgIC5zZXRMaW1pdHMoMTAwLCAxMDAsIDUpXG4gICAgLy8gICAgIC5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy5jb2xvckRpZmZCZXR3ZWVuQWN0aXZlKVxuICAgIC8vICAgICAub25DaGFuZ2UoKHZhbHVlKSA9PiB7XG4gICAgLy8gICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3MuY29sb3JEaWZmQmV0d2VlbkFjdGl2ZSA9IHZhbHVlO1xuICAgIC8vICAgICAgIGxldCBhY3RpdmVDb2xvckxpZ2h0ID0gaGV4VG9SZ2IocmdiVG9IZXgodGhpcy5wbHVnaW4uc2V0dGluZ3MuY29sb3JBY3RpdmVDYXJkRGFyaykpO1xuICAgIC8vICAgICAgIGxldCBhY3RpdmVDb2xvckRhcmsgPSBoZXhUb1JnYihyZ2JUb0hleCh0aGlzLnBsdWdpbi5zZXR0aW5ncy5jb2xvckFjdGl2ZUNhcmREYXJrKSk7XG4gICAgLy8gICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3MuY29sb3JOb25BY3RpdmVDYXJkTGlnaHQgPSBgJHthY3RpdmVDb2xvckxpZ2h0LnIgLSB2YWx1ZX0sICR7YWN0aXZlQ29sb3JMaWdodC5nIC0gdmFsdWV9LCAke2FjdGl2ZUNvbG9yTGlnaHQuYiAtIHZhbHVlfWA7XG4gICAgLy8gICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3MuY29sb3JOb25BY3RpdmVDYXJkRGFyayA9IGAke2FjdGl2ZUNvbG9yRGFyay5yIC0gdmFsdWV9LCAke2FjdGl2ZUNvbG9yRGFyay5nIC0gdmFsdWV9LCAke2FjdGl2ZUNvbG9yRGFyay5iIC0gdmFsdWV9YDtcbiAgICAvLyAgICAgICB0aGlzLnBsdWdpbi5zYXZlRGF0YSh0aGlzLnBsdWdpbi5zZXR0aW5ncyk7XG4gICAgLy8gICAgICAgdGhpcy5wbHVnaW4ucmVmcmVzaCgpO1xuICAgIC8vICAgICB9KVxuICAgIC8vICk7XG5cbiAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcbiAgICAgIC5zZXROYW1lKCdEaWZmIEJldHdlZW4gQWN0aXZlICYgTm9uQWN0aXZlIENhcmRzJylcbiAgICAgIC5zZXREZXNjKCdTcGNpZml5IENvbG9yIGRpZmZlcmVuY2UgYmV0d2VlbiBhY3RpdmUgJiBub24gYWN0aXZlIGNhcmRzLiBTZXQgMCB0byBkaWFibGUgXCJBdHRlbnRpb24gcGFuZVwiJylcbiAgICAgIC5hZGRUZXh0KHRleHQgPT4gdGV4dC5zZXRQbGFjZWhvbGRlcignRXhhbXBsZTogNzAwJylcbiAgICAgICAgLnNldFZhbHVlKCh0aGlzLnBsdWdpbi5zZXR0aW5ncy5jb2xvckRpZmZCZXR3ZWVuQWN0aXZlIHx8ICcnKSArICcnKVxuICAgICAgICAuc2V0UGxhY2Vob2xkZXIoJ2RlZmFsdXQ6IDIwJylcbiAgICAgICAgLm9uQ2hhbmdlKCh2YWx1ZSkgPT4ge1xuICAgICAgICAgIGxldCBudSA9IE51bWJlcih2YWx1ZSlcbiAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5jb2xvckRpZmZCZXR3ZWVuQWN0aXZlID0gbnU7XG4gICAgICAgICAgbGV0IGFjdGl2ZUNvbG9yTGlnaHQgPSBoZXhUb1JnYihyZ2JUb0hleCh0aGlzLnBsdWdpbi5zZXR0aW5ncy5jb2xvckFjdGl2ZUNhcmREYXJrKSk7XG4gICAgICAgICAgbGV0IGFjdGl2ZUNvbG9yRGFyayA9IGhleFRvUmdiKHJnYlRvSGV4KHRoaXMucGx1Z2luLnNldHRpbmdzLmNvbG9yQWN0aXZlQ2FyZERhcmspKTtcbiAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5jb2xvck5vbkFjdGl2ZUNhcmRMaWdodCA9IGAke2FjdGl2ZUNvbG9yTGlnaHQuciAtIG51fSwgJHthY3RpdmVDb2xvckxpZ2h0LmcgLSBudX0sICR7YWN0aXZlQ29sb3JMaWdodC5iIC0gbnV9YDtcbiAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5jb2xvck5vbkFjdGl2ZUNhcmREYXJrID0gYCR7YWN0aXZlQ29sb3JEYXJrLnIgLSBudX0sICR7YWN0aXZlQ29sb3JEYXJrLmcgLSBudX0sICR7YWN0aXZlQ29sb3JEYXJrLmIgLSBudX1gO1xuICAgICAgICAgIHRoaXMucGx1Z2luLnNhdmVEYXRhKHRoaXMucGx1Z2luLnNldHRpbmdzKTtcbiAgICAgICAgICB0aGlzLnBsdWdpbi5yZWZyZXNoKCk7XG4gICAgICAgIH0pXG4gICAgICApO1xuXG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIENhcmRWaWV3TW9kZUNvbW1hbmRzIHtcbiAgcGx1Z2luOiBDYXJkVmlld01vZGVQbHVnaW47XG4gIGNvbnN0cnVjdG9yKHBsdWdpbjogQ2FyZFZpZXdNb2RlUGx1Z2luKSB7XG4gICAgdGhpcy5wbHVnaW4gPSBwbHVnaW47XG4gIH1cblxuICBhZGRUb2dnbGVTZXR0aW5nQ29tbWFuZChpZDpzdHJpbmcsIG5hbWU6c3RyaW5nLCBzZXR0aW5nTmFtZTpzdHJpbmcpIHtcbiAgICB0aGlzLnBsdWdpbi5hZGRDb21tYW5kKHtcbiAgICAgIGlkOiBpZCxcbiAgICAgIG5hbWU6IG5hbWUsXG4gICAgICBjYWxsYmFjazogKCkgPT4ge1xuICAgICAgICAvLyBzd2l0Y2ggdGhlIHNldHRpbmcsIHNhdmUgYW5kIHJlZnJlc2hcbiAgICAgICAgLy9AdHMtaWdub3JlXG4gICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzW3NldHRpbmdOYW1lXSA9ICF0aGlzLnBsdWdpbi5zZXR0aW5nc1tzZXR0aW5nTmFtZV07XG4gICAgICAgIHRoaXMucGx1Z2luLnNhdmVEYXRhKHRoaXMucGx1Z2luLnNldHRpbmdzKTtcbiAgICAgICAgdGhpcy5wbHVnaW4ucmVmcmVzaCgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgYWRkQ29tbWFuZHMoKTogdm9pZCB7XG4gICAgdGhpcy5wbHVnaW4uYWRkQ29tbWFuZCh7XG4gICAgICBpZDogJ3RvZ2dsZS1jYXJkLXZpZXctbW9kZScsXG4gICAgICBuYW1lOiAnVG9nZ2xlIENhcmQgVmlldycsXG4gICAgICBjYWxsYmFjazogKCkgPT4ge1xuICAgICAgICAvLyBzd2l0Y2ggdGhlIGRpc2FibGVkIHNldHRpbmcgYW5kIHNhdmVcbiAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3MuZGlzYWJsZWQgPSAhdGhpcy5wbHVnaW4uc2V0dGluZ3MuZGlzYWJsZWQ7XG4gICAgICAgIHRoaXMucGx1Z2luLnNhdmVEYXRhKHRoaXMucGx1Z2luLnNldHRpbmdzKTtcblxuICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5kaXNhYmxlZCA/IHRoaXMucGx1Z2luLmRpc2FibGUoKSA6IHRoaXMucGx1Z2luLmVuYWJsZSgpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGhpcy5hZGRUb2dnbGVTZXR0aW5nQ29tbWFuZCgndG9nZ2xlLWNhcmQtdGl0bGUnLCAnVG9nZ2xlIENhcmQgVGl0bGUnLCAnY2FyZFRpdGxlJyk7XG4gIH1cbn1cblxuXG5mdW5jdGlvbiBoZXhUb1JnYihoZXg6IHN0cmluZykge1xuICAgIGxldCByZXN1bHQgPSAvXiM/KFthLWZcXGRdezJ9KShbYS1mXFxkXXsyfSkoW2EtZlxcZF17Mn0pJC9pLmV4ZWMoaGV4KTtcblxuICAgIHJldHVybiByZXN1bHRcbiAgICAgICAgPyB7XG4gICAgICAgICAgICAgIHI6IHBhcnNlSW50KHJlc3VsdFsxXSwgMTYpLFxuICAgICAgICAgICAgICBnOiBwYXJzZUludChyZXN1bHRbMl0sIDE2KSxcbiAgICAgICAgICAgICAgYjogcGFyc2VJbnQocmVzdWx0WzNdLCAxNilcbiAgICAgICAgICB9XG4gICAgICAgIDogbnVsbDtcbn1cbmZ1bmN0aW9uIGNvbXBvbmVudFRvSGV4KGM6IG51bWJlcikge1xuICAgIHZhciBoZXggPSBjLnRvU3RyaW5nKDE2KTtcbiAgICByZXR1cm4gaGV4Lmxlbmd0aCA9PSAxID8gXCIwXCIgKyBoZXggOiBoZXg7XG59XG5mdW5jdGlvbiByZ2JUb0hleChyZ2I6IHN0cmluZykge1xuICAgIGxldCByZXN1bHQgPSAvXihcXGQrKSxcXHM/KFxcZCspLFxccz8oXFxkKykvaS5leGVjKHJnYik7XG4gICAgaWYgKCFyZXN1bHQgfHwgIXJlc3VsdC5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgfVxuICAgIHJldHVybiBgIyR7Y29tcG9uZW50VG9IZXgoTnVtYmVyKHJlc3VsdFsxXSkpfSR7Y29tcG9uZW50VG9IZXgoXG4gICAgICAgIE51bWJlcihyZXN1bHRbMl0pXG4gICAgKX0ke2NvbXBvbmVudFRvSGV4KE51bWJlcihyZXN1bHRbM10pKX1gO1xufVxuIiwiaW1wb3J0ICcuL3N0eWxlcy5zY3NzJ1xuaW1wb3J0IHsgUGx1Z2luIH0gZnJvbSAnb2JzaWRpYW4nO1xuaW1wb3J0IHsgXG4gIENhcmRWaWV3TW9kZVNldHRpbmdzLCBcbiAgQ2FyZFZpZXdNb2RlU2V0dGluZ1RhYiwgXG4gIENhcmRWaWV3TW9kZUNvbW1hbmRzIFxufSBmcm9tICcuL3NldHRpbmdzJztcblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDYXJkVmlld01vZGVQbHVnaW4gZXh0ZW5kcyBQbHVnaW4ge1xuICBzZXR0aW5nczogQ2FyZFZpZXdNb2RlU2V0dGluZ3M7XG5cbiAgYXN5bmMgb25sb2FkKCkge1xuICAgICAgdGhpcy5zZXR0aW5ncyA9IE9iamVjdC5hc3NpZ24obmV3IENhcmRWaWV3TW9kZVNldHRpbmdzKCksIGF3YWl0IHRoaXMubG9hZERhdGEoKSk7XG4gICAgICBpZiAoIXRoaXMuc2V0dGluZ3MuZGlzYWJsZWQpIHRoaXMuZW5hYmxlKCk7XG4gICAgICB0aGlzLmFkZFNldHRpbmdUYWIobmV3IENhcmRWaWV3TW9kZVNldHRpbmdUYWIodGhpcy5hcHAsIHRoaXMpKTtcbiAgICAgIG5ldyBDYXJkVmlld01vZGVDb21tYW5kcyh0aGlzKS5hZGRDb21tYW5kcygpO1xuICB9XG5cbiAgb251bmxvYWQoKXtcbiAgICB0aGlzLmRpc2FibGUoKTtcbiAgfSAgIFxuXG4gIGVuYWJsZSA9ICgpID0+IHtcbiAgICB0aGlzLnJlZ2lzdGVyRXZlbnQodGhpcy5hcHAud29ya3NwYWNlLm9uKCdyZXNpemUnLCB0aGlzLmhhbmRsZVJlc2l6ZSkpO1xuICAgIHRoaXMuYXBwLndvcmtzcGFjZS5sYXlvdXRSZWFkeSA/IHRoaXMucmVhbGx5RW5hYmxlKCkgOiB0aGlzLmFwcC53b3Jrc3BhY2Uub24oJ2xheW91dC1jaGFuZ2UnLCB0aGlzLnJlYWxseUVuYWJsZSk7XG4gIH1cblxuXG4gIHJlYWxseUVuYWJsZSA9ICgpID0+IHtcbiAgICB0aGlzLmFwcC53b3Jrc3BhY2Uub2ZmKCdsYXlvdXQtcmVhZHknLCB0aGlzLnJlYWxseUVuYWJsZSk7XG4gICAgdGhpcy5hZGRTdHlsZSgpO1xuICAgIHRoaXMub2JzZXJ2ZUxlYWZXaWR0aCgpO1xuICB9XG5cbiAgZGlzYWJsZSA9ICgpID0+IHtcbiAgICB0aGlzLnJlbW92ZVN0eWxlKCk7XG4gICAgXG4gIH1cblxuICByZWZyZXNoID0gKCkgPT4ge1xuICAgIHRoaXMudXBkYXRlU3R5bGUoKVxuICAgIHRoaXMub2JzZXJ2ZUxlYWZXaWR0aCgpO1xuICB9XG5cbiAgcmVtb3ZlU3R5bGUgPSAoKSA9PiB7XG4gICAgLy8gY29uc3QgZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGx1Z2luLWNhcmQtdmlldy1tb2RlJyk7XG4gICAgLy8gaWYgKGVsKSBlbC5yZW1vdmUoKTtcbiAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoJ3BsdWdpbi1jYXJkLXZpZXctbW9kZScpO1xuICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnJlbW92ZSgncGx1Z2luLWNhcmQtdmlldy1tb2RlLWNhcmR0aXRsZScpO1xuXG4gICAgLy8gZG9jdW1lbnQuYm9keS5yZW1vdmVDbGFzcygncGx1Z2luLWNhcmQtdmlldy1tb2RlJywgJ3BsdWdpbi1jYXJkLXZpZXctbW9kZS1jYXJkdGl0bGUnKTtcbiAgfVxuXG4gIGFkZFN0eWxlID0gKCkgPT4ge1xuICAgIC8vIGNvbnN0IGNzcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gICAgLy8gY3NzLmlkID0gJ3BsdWdpbi1jYXJkLXZpZXctbW9kZS1jYXJkdGl0bGUnO1xuICAgIC8vIGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiaGVhZFwiKVswXS5hcHBlbmRDaGlsZChjc3MpO1xuXG4gICAgLy8gZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKCdwbHVnaW4tY2FyZC12aWV3LW1vZGUnKTtcbiAgICAvLyB0aGlzLnVwZGF0ZVN0eWxlKCk7XG5cbiAgICBjb25zdCBjc3MgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuICAgIGNzcy5pZCA9ICdwbHVnaW4tY2FyZC12aWV3LW1vZGUnO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiaGVhZFwiKVswXS5hcHBlbmRDaGlsZChjc3MpO1xuXG4gICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKCdwbHVnaW4tY2FyZC12aWV3LW1vZGUnKTtcbiAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoJ3BsdWdpbi1jYXJkLXZpZXctbW9kZS1jYXJkdGl0bGUnKTtcbiAgICB0aGlzLnVwZGF0ZVN0eWxlKCk7XG4gIH1cbiAgXG4gIHVwZGF0ZVN0eWxlID0gKCkgPT4ge1xuICAgIC8vIDEuIHJlbW92ZSBzdHlsZSBiZWZvcmUgY2hhbmdpbmdcbiAgICAvLyB0aGlzLnJlbW92ZVN0eWxlKCk7XG4gICAgLy8g44GT44KM44KE44KL44Go44K544K/44Kk44Or5pu05paw44GV44KM44Gq44GEXG5cbiAgICAvLyAyLWEuIHVwZGF0ZSBib29sZWFuIHNldHRpbmdzXG4gICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QudG9nZ2xlKCdwbHVnaW4tY2FyZC12aWV3LW1vZGUtY2FyZHRpdGxlJywgdGhpcy5zZXR0aW5ncy5jYXJkVGl0bGUpO1xuXG4gICAgLy8gMi1iLiB1cGRhYXRlIGN1c3RvbSBjc3MgcHJvcGVydGllc1xuICAgIGNvbnN0IGVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BsdWdpbi1jYXJkLXZpZXctbW9kZScpO1xuICAgIGlmICghZWwpIHRocm93IFwicGx1Z2luLWNhcmQtdmlldy1tb2RlIGVsZW1lbnQgbm90IGZvdW5kIVwiO1xuICAgIGVsc2Uge1xuICAgICAgICBlbC5pbm5lclRleHQgPSBgXG4gICAgICAgIGJvZHkucGx1Z2luLWNhcmQtdmlldy1tb2RlLnRoZW1lLWxpZ2h0e1xuICAgICAgICAgIC0tY2FyZHZpZXctY2FyZC1jb2xvci1hY3RpdmU6IHJnYigke3RoaXMuc2V0dGluZ3MuY29sb3JBY3RpdmVDYXJkTGlnaHR9KTtcbiAgICAgICAgICAtLWNhcmR2aWV3LWNhcmQtY29sb3Itbm9uLWFjdGl2ZTogcmdiKCR7dGhpcy5zZXR0aW5ncy5jb2xvck5vbkFjdGl2ZUNhcmRMaWdodH0pO1xuICAgICAgICAgIC0tY2FyZHZpZXctYmFja2dyb3VuZC1jb2xvci1kZWZhdWx0OiByZ2IoJHt0aGlzLnNldHRpbmdzLmNvbG9yQmFja0dyb3VuZExpZ2h0fSk7XG4gICAgICAgIH1cbiAgICAgICAgYm9keS5wbHVnaW4tY2FyZC12aWV3LW1vZGUudGhlbWUtZGFya3tcbiAgICAgICAgICAtLWNhcmR2aWV3LWNhcmQtY29sb3ItYWN0aXZlOiByZ2IoJHt0aGlzLnNldHRpbmdzLmNvbG9yQWN0aXZlQ2FyZERhcmt9KTtcbiAgICAgICAgICAtLWNhcmR2aWV3LWNhcmQtY29sb3Itbm9uLWFjdGl2ZTogcmdiKCR7dGhpcy5zZXR0aW5ncy5jb2xvck5vbkFjdGl2ZUNhcmREYXJrfSk7XG4gICAgICAgICAgLS1jYXJkdmlldy1iYWNrZ3JvdW5kLWNvbG9yLWRlZmF1bHQ6IHJnYigke3RoaXMuc2V0dGluZ3MuY29sb3JCYWNrR3JvdW5kRGFya30pO1xuICAgICAgICB9XG4gICAgICAgIGA7XG4gICAgfVxuICB9XG5cbiAgaGFuZGxlUmVzaXplID0gKCkgPT4ge1xuICAgIGlmICh0aGlzLmFwcC53b3Jrc3BhY2UubGF5b3V0UmVhZHkpIHtcbiAgICAgIHRoaXMub2JzZXJ2ZUxlYWZXaWR0aCgpO1xuICAgIH1cbiAgfVxuIFxuICBvYnNlcnZlTGVhZldpZHRoID0gKCkgPT4ge1xuICAgIGNvbnN0IGNhcmRUaXRsZVdpZHRoTGlzdCA9IDxOb2RlTGlzdE9mPEhUTUxFbGVtZW50Pj5kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZW1iZWRkZWQtbm90ZS10aXRsZXMgLkNvZGVNaXJyb3Itc2Nyb2xsPmgxW2lkKj1cInRpdGxlLVwiXScpO1xuICAgIGNvbnN0IHBhbmVMZWFmV2lkdGggPSA8Tm9kZUxpc3RPZjxIVE1MRWxlbWVudD4+ZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLkNvZGVNaXJyb3Itc2l6ZXIgLkNvZGVNaXJyb3ItbGluZXM+ZGl2W3JvbGU9XCJwcmVzZW50YXRpb25cIl0nKTtcbiAgICBcblxuICAgIGNvbnN0IHJlc2l6ZU9ic2VydmVyID0gbmV3IFJlc2l6ZU9ic2VydmVyKGVudHJpZXMgPT4ge1xuICAgICAgXG4gICAgICBmb3IobGV0IGkgPSAwOyBpIDwgZW50cmllcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBsZXQgZW50cnkgPSBlbnRyaWVzW2ldO1xuICAgICAgICBpZihlbnRyeS5jb250ZW50UmVjdCl7XG4gICAgICAgICAgY2FyZFRpdGxlV2lkdGhMaXN0W2ldLnN0eWxlLndpZHRoID0gU3RyaW5nKGVudHJ5LmNvbnRlbnRSZWN0LndpZHRoICsgNikgKyBgcHhgO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBmb3IobGV0IGsgPTA7IGsgPCBwYW5lTGVhZldpZHRoLmxlbmd0aDsgaysrKXtcbiAgICAgIHJlc2l6ZU9ic2VydmVyLm9ic2VydmUocGFuZUxlYWZXaWR0aFtrXSk7XG4gICAgfVxuXG4gIH1cblxuXG59XG5cbiJdLCJuYW1lcyI6WyJTZXR0aW5nIiwiUGx1Z2luU2V0dGluZ1RhYiIsIlBsdWdpbiJdLCJtYXBwaW5ncyI6Ijs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSSxhQUFhLEdBQUcsU0FBUyxDQUFDLEVBQUUsQ0FBQyxFQUFFO0FBQ25DLElBQUksYUFBYSxHQUFHLE1BQU0sQ0FBQyxjQUFjO0FBQ3pDLFNBQVMsRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLFlBQVksS0FBSyxJQUFJLFVBQVUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQztBQUNwRixRQUFRLFVBQVUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEtBQUssSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksTUFBTSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztBQUMxRyxJQUFJLE9BQU8sYUFBYSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUMvQixDQUFDLENBQUM7QUFDRjtBQUNPLFNBQVMsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUU7QUFDaEMsSUFBSSxJQUFJLE9BQU8sQ0FBQyxLQUFLLFVBQVUsSUFBSSxDQUFDLEtBQUssSUFBSTtBQUM3QyxRQUFRLE1BQU0sSUFBSSxTQUFTLENBQUMsc0JBQXNCLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLCtCQUErQixDQUFDLENBQUM7QUFDbEcsSUFBSSxhQUFhLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQ3hCLElBQUksU0FBUyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQyxFQUFFO0FBQzNDLElBQUksQ0FBQyxDQUFDLFNBQVMsR0FBRyxDQUFDLEtBQUssSUFBSSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUMsU0FBUyxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztBQUN6RixDQUFDO0FBdUNEO0FBQ08sU0FBUyxTQUFTLENBQUMsT0FBTyxFQUFFLFVBQVUsRUFBRSxDQUFDLEVBQUUsU0FBUyxFQUFFO0FBQzdELElBQUksU0FBUyxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsT0FBTyxLQUFLLFlBQVksQ0FBQyxHQUFHLEtBQUssR0FBRyxJQUFJLENBQUMsQ0FBQyxVQUFVLE9BQU8sRUFBRSxFQUFFLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFO0FBQ2hILElBQUksT0FBTyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsT0FBTyxDQUFDLEVBQUUsVUFBVSxPQUFPLEVBQUUsTUFBTSxFQUFFO0FBQy9ELFFBQVEsU0FBUyxTQUFTLENBQUMsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtBQUNuRyxRQUFRLFNBQVMsUUFBUSxDQUFDLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtBQUN0RyxRQUFRLFNBQVMsSUFBSSxDQUFDLE1BQU0sRUFBRSxFQUFFLE1BQU0sQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsUUFBUSxDQUFDLENBQUMsRUFBRTtBQUN0SCxRQUFRLElBQUksQ0FBQyxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxVQUFVLElBQUksRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztBQUM5RSxLQUFLLENBQUMsQ0FBQztBQUNQLENBQUM7QUFDRDtBQUNPLFNBQVMsV0FBVyxDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUU7QUFDM0MsSUFBSSxJQUFJLENBQUMsR0FBRyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQ3JILElBQUksT0FBTyxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLE9BQU8sTUFBTSxLQUFLLFVBQVUsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLFdBQVcsRUFBRSxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDN0osSUFBSSxTQUFTLElBQUksQ0FBQyxDQUFDLEVBQUUsRUFBRSxPQUFPLFVBQVUsQ0FBQyxFQUFFLEVBQUUsT0FBTyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRTtBQUN0RSxJQUFJLFNBQVMsSUFBSSxDQUFDLEVBQUUsRUFBRTtBQUN0QixRQUFRLElBQUksQ0FBQyxFQUFFLE1BQU0sSUFBSSxTQUFTLENBQUMsaUNBQWlDLENBQUMsQ0FBQztBQUN0RSxRQUFRLE9BQU8sQ0FBQyxFQUFFLElBQUk7QUFDdEIsWUFBWSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztBQUN6SyxZQUFZLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxD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
