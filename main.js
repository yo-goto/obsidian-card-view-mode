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
        // SLIDER
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
            // コンストラクタとコールバック
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
        // fixifr = () => {  
        //   //　iframeタグのElementリストをifrObjsオブジェクトに取り込む  
        //   var ifrObjs=document.getElementsByTagName("iframe");  
        //  // iframeタグが複数個ある場合、各iframeタグについて表示されるページの高さにiframeの高さを調整する 
        //   for(let i=0; i<ifrObjs.length;i++){
        //        var ifrObj = ifrObjs.item(i);
        //        ifrObj.height = `ifrObj.contentDocument.body.scrollHeight`;
        //    }
        // }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsibm9kZV9tb2R1bGVzL3RzbGliL3RzbGliLmVzNi5qcyIsInNyYy9zZXR0aW5ncy50cyIsInNyYy9tYWluLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qISAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5Db3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi5cclxuXHJcblBlcm1pc3Npb24gdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZC9vciBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmUgZm9yIGFueVxyXG5wdXJwb3NlIHdpdGggb3Igd2l0aG91dCBmZWUgaXMgaGVyZWJ5IGdyYW50ZWQuXHJcblxyXG5USEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiIEFORCBUSEUgQVVUSE9SIERJU0NMQUlNUyBBTEwgV0FSUkFOVElFUyBXSVRIXHJcblJFR0FSRCBUTyBUSElTIFNPRlRXQVJFIElOQ0xVRElORyBBTEwgSU1QTElFRCBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWVxyXG5BTkQgRklUTkVTUy4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUiBCRSBMSUFCTEUgRk9SIEFOWSBTUEVDSUFMLCBESVJFQ1QsXHJcbklORElSRUNULCBPUiBDT05TRVFVRU5USUFMIERBTUFHRVMgT1IgQU5ZIERBTUFHRVMgV0hBVFNPRVZFUiBSRVNVTFRJTkcgRlJPTVxyXG5MT1NTIE9GIFVTRSwgREFUQSBPUiBQUk9GSVRTLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgTkVHTElHRU5DRSBPUlxyXG5PVEhFUiBUT1JUSU9VUyBBQ1RJT04sIEFSSVNJTkcgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgVVNFIE9SXHJcblBFUkZPUk1BTkNFIE9GIFRISVMgU09GVFdBUkUuXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXHJcbi8qIGdsb2JhbCBSZWZsZWN0LCBQcm9taXNlICovXHJcblxyXG52YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGIsIHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXh0ZW5kcyhkLCBiKSB7XHJcbiAgICBpZiAodHlwZW9mIGIgIT09IFwiZnVuY3Rpb25cIiAmJiBiICE9PSBudWxsKVxyXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDbGFzcyBleHRlbmRzIHZhbHVlIFwiICsgU3RyaW5nKGIpICsgXCIgaXMgbm90IGEgY29uc3RydWN0b3Igb3IgbnVsbFwiKTtcclxuICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxufVxyXG5cclxuZXhwb3J0IHZhciBfX2Fzc2lnbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uIF9fYXNzaWduKHQpIHtcclxuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKSB0W3BdID0gc1twXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVzdChzLCBlKSB7XHJcbiAgICB2YXIgdCA9IHt9O1xyXG4gICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXHJcbiAgICAgICAgdFtwXSA9IHNbcF07XHJcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoZS5pbmRleE9mKHBbaV0pIDwgMCAmJiBPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwocywgcFtpXSkpXHJcbiAgICAgICAgICAgICAgICB0W3BbaV1dID0gc1twW2ldXTtcclxuICAgICAgICB9XHJcbiAgICByZXR1cm4gdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcclxuICAgIHZhciBjID0gYXJndW1lbnRzLmxlbmd0aCwgciA9IGMgPCAzID8gdGFyZ2V0IDogZGVzYyA9PT0gbnVsbCA/IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSA6IGRlc2MsIGQ7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QuZGVjb3JhdGUgPT09IFwiZnVuY3Rpb25cIikgciA9IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpO1xyXG4gICAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcclxuICAgIHJldHVybiBjID4gMyAmJiByICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgciksIHI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3BhcmFtKHBhcmFtSW5kZXgsIGRlY29yYXRvcikge1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQsIGtleSkgeyBkZWNvcmF0b3IodGFyZ2V0LCBrZXksIHBhcmFtSW5kZXgpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKSB7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QubWV0YWRhdGEgPT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIFJlZmxlY3QubWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdGVyKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xyXG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZ2VuZXJhdG9yKHRoaXNBcmcsIGJvZHkpIHtcclxuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7XHJcbiAgICByZXR1cm4gZyA9IHsgbmV4dDogdmVyYigwKSwgXCJ0aHJvd1wiOiB2ZXJiKDEpLCBcInJldHVyblwiOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xyXG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcclxuICAgICAgICB3aGlsZSAoXykgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xyXG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XHJcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxyXG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgdmFyIF9fY3JlYXRlQmluZGluZyA9IE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcclxuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgazIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIG1ba107IH0gfSk7XHJcbn0pIDogKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XHJcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xyXG4gICAgb1trMl0gPSBtW2tdO1xyXG59KTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4cG9ydFN0YXIobSwgbykge1xyXG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAocCAhPT0gXCJkZWZhdWx0XCIgJiYgIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvLCBwKSkgX19jcmVhdGVCaW5kaW5nKG8sIG0sIHApO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX192YWx1ZXMobykge1xyXG4gICAgdmFyIHMgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgU3ltYm9sLml0ZXJhdG9yLCBtID0gcyAmJiBvW3NdLCBpID0gMDtcclxuICAgIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pO1xyXG4gICAgaWYgKG8gJiYgdHlwZW9mIG8ubGVuZ3RoID09PSBcIm51bWJlclwiKSByZXR1cm4ge1xyXG4gICAgICAgIG5leHQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKG8gJiYgaSA+PSBvLmxlbmd0aCkgbyA9IHZvaWQgMDtcclxuICAgICAgICAgICAgcmV0dXJuIHsgdmFsdWU6IG8gJiYgb1tpKytdLCBkb25lOiAhbyB9O1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKHMgPyBcIk9iamVjdCBpcyBub3QgaXRlcmFibGUuXCIgOiBcIlN5bWJvbC5pdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3JlYWQobywgbikge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdO1xyXG4gICAgaWYgKCFtKSByZXR1cm4gbztcclxuICAgIHZhciBpID0gbS5jYWxsKG8pLCByLCBhciA9IFtdLCBlO1xyXG4gICAgdHJ5IHtcclxuICAgICAgICB3aGlsZSAoKG4gPT09IHZvaWQgMCB8fCBuLS0gPiAwKSAmJiAhKHIgPSBpLm5leHQoKSkuZG9uZSkgYXIucHVzaChyLnZhbHVlKTtcclxuICAgIH1cclxuICAgIGNhdGNoIChlcnJvcikgeyBlID0geyBlcnJvcjogZXJyb3IgfTsgfVxyXG4gICAgZmluYWxseSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKHIgJiYgIXIuZG9uZSAmJiAobSA9IGlbXCJyZXR1cm5cIl0pKSBtLmNhbGwoaSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZpbmFsbHkgeyBpZiAoZSkgdGhyb3cgZS5lcnJvcjsgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG4vKiogQGRlcHJlY2F0ZWQgKi9cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkKCkge1xyXG4gICAgZm9yICh2YXIgYXIgPSBbXSwgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspXHJcbiAgICAgICAgYXIgPSBhci5jb25jYXQoX19yZWFkKGFyZ3VtZW50c1tpXSkpO1xyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG4vKiogQGRlcHJlY2F0ZWQgKi9cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkQXJyYXlzKCkge1xyXG4gICAgZm9yICh2YXIgcyA9IDAsIGkgPSAwLCBpbCA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBpbDsgaSsrKSBzICs9IGFyZ3VtZW50c1tpXS5sZW5ndGg7XHJcbiAgICBmb3IgKHZhciByID0gQXJyYXkocyksIGsgPSAwLCBpID0gMDsgaSA8IGlsOyBpKyspXHJcbiAgICAgICAgZm9yICh2YXIgYSA9IGFyZ3VtZW50c1tpXSwgaiA9IDAsIGpsID0gYS5sZW5ndGg7IGogPCBqbDsgaisrLCBrKyspXHJcbiAgICAgICAgICAgIHJba10gPSBhW2pdO1xyXG4gICAgcmV0dXJuIHI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZEFycmF5KHRvLCBmcm9tLCBwYWNrKSB7XHJcbiAgICBpZiAocGFjayB8fCBhcmd1bWVudHMubGVuZ3RoID09PSAyKSBmb3IgKHZhciBpID0gMCwgbCA9IGZyb20ubGVuZ3RoLCBhcjsgaSA8IGw7IGkrKykge1xyXG4gICAgICAgIGlmIChhciB8fCAhKGkgaW4gZnJvbSkpIHtcclxuICAgICAgICAgICAgaWYgKCFhcikgYXIgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChmcm9tLCAwLCBpKTtcclxuICAgICAgICAgICAgYXJbaV0gPSBmcm9tW2ldO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiB0by5jb25jYXQoYXIgfHwgZnJvbSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0KHYpIHtcclxuICAgIHJldHVybiB0aGlzIGluc3RhbmNlb2YgX19hd2FpdCA/ICh0aGlzLnYgPSB2LCB0aGlzKSA6IG5ldyBfX2F3YWl0KHYpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0dlbmVyYXRvcih0aGlzQXJnLCBfYXJndW1lbnRzLCBnZW5lcmF0b3IpIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgZyA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSwgaSwgcSA9IFtdO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlmIChnW25dKSBpW25dID0gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChhLCBiKSB7IHEucHVzaChbbiwgdiwgYSwgYl0pID4gMSB8fCByZXN1bWUobiwgdik7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiByZXN1bWUobiwgdikgeyB0cnkgeyBzdGVwKGdbbl0odikpOyB9IGNhdGNoIChlKSB7IHNldHRsZShxWzBdWzNdLCBlKTsgfSB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKHIpIHsgci52YWx1ZSBpbnN0YW5jZW9mIF9fYXdhaXQgPyBQcm9taXNlLnJlc29sdmUoci52YWx1ZS52KS50aGVuKGZ1bGZpbGwsIHJlamVjdCkgOiBzZXR0bGUocVswXVsyXSwgcik7IH1cclxuICAgIGZ1bmN0aW9uIGZ1bGZpbGwodmFsdWUpIHsgcmVzdW1lKFwibmV4dFwiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHJlamVjdCh2YWx1ZSkgeyByZXN1bWUoXCJ0aHJvd1wiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShmLCB2KSB7IGlmIChmKHYpLCBxLnNoaWZ0KCksIHEubGVuZ3RoKSByZXN1bWUocVswXVswXSwgcVswXVsxXSk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNEZWxlZ2F0b3Iobykge1xyXG4gICAgdmFyIGksIHA7XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIsIGZ1bmN0aW9uIChlKSB7IHRocm93IGU7IH0pLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuLCBmKSB7IGlbbl0gPSBvW25dID8gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIChwID0gIXApID8geyB2YWx1ZTogX19hd2FpdChvW25dKHYpKSwgZG9uZTogbiA9PT0gXCJyZXR1cm5cIiB9IDogZiA/IGYodikgOiB2OyB9IDogZjsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY1ZhbHVlcyhvKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIG0gPSBvW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSwgaTtcclxuICAgIHJldHVybiBtID8gbS5jYWxsKG8pIDogKG8gPSB0eXBlb2YgX192YWx1ZXMgPT09IFwiZnVuY3Rpb25cIiA/IF9fdmFsdWVzKG8pIDogb1tTeW1ib2wuaXRlcmF0b3JdKCksIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpKTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpW25dID0gb1tuXSAmJiBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkgeyB2ID0gb1tuXSh2KSwgc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgdi5kb25lLCB2LnZhbHVlKTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShyZXNvbHZlLCByZWplY3QsIGQsIHYpIHsgUHJvbWlzZS5yZXNvbHZlKHYpLnRoZW4oZnVuY3Rpb24odikgeyByZXNvbHZlKHsgdmFsdWU6IHYsIGRvbmU6IGQgfSk7IH0sIHJlamVjdCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWFrZVRlbXBsYXRlT2JqZWN0KGNvb2tlZCwgcmF3KSB7XHJcbiAgICBpZiAoT2JqZWN0LmRlZmluZVByb3BlcnR5KSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb29rZWQsIFwicmF3XCIsIHsgdmFsdWU6IHJhdyB9KTsgfSBlbHNlIHsgY29va2VkLnJhdyA9IHJhdzsgfVxyXG4gICAgcmV0dXJuIGNvb2tlZDtcclxufTtcclxuXHJcbnZhciBfX3NldE1vZHVsZURlZmF1bHQgPSBPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIHYpIHtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBcImRlZmF1bHRcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdiB9KTtcclxufSkgOiBmdW5jdGlvbihvLCB2KSB7XHJcbiAgICBvW1wiZGVmYXVsdFwiXSA9IHY7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnRTdGFyKG1vZCkge1xyXG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcclxuICAgIHZhciByZXN1bHQgPSB7fTtcclxuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChrICE9PSBcImRlZmF1bHRcIiAmJiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9kLCBrKSkgX19jcmVhdGVCaW5kaW5nKHJlc3VsdCwgbW9kLCBrKTtcclxuICAgIF9fc2V0TW9kdWxlRGVmYXVsdChyZXN1bHQsIG1vZCk7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnREZWZhdWx0KG1vZCkge1xyXG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBkZWZhdWx0OiBtb2QgfTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fY2xhc3NQcml2YXRlRmllbGRHZXQocmVjZWl2ZXIsIHN0YXRlLCBraW5kLCBmKSB7XHJcbiAgICBpZiAoa2luZCA9PT0gXCJhXCIgJiYgIWYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJQcml2YXRlIGFjY2Vzc29yIHdhcyBkZWZpbmVkIHdpdGhvdXQgYSBnZXR0ZXJcIik7XHJcbiAgICBpZiAodHlwZW9mIHN0YXRlID09PSBcImZ1bmN0aW9uXCIgPyByZWNlaXZlciAhPT0gc3RhdGUgfHwgIWYgOiAhc3RhdGUuaGFzKHJlY2VpdmVyKSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCByZWFkIHByaXZhdGUgbWVtYmVyIGZyb20gYW4gb2JqZWN0IHdob3NlIGNsYXNzIGRpZCBub3QgZGVjbGFyZSBpdFwiKTtcclxuICAgIHJldHVybiBraW5kID09PSBcIm1cIiA/IGYgOiBraW5kID09PSBcImFcIiA/IGYuY2FsbChyZWNlaXZlcikgOiBmID8gZi52YWx1ZSA6IHN0YXRlLmdldChyZWNlaXZlcik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2NsYXNzUHJpdmF0ZUZpZWxkU2V0KHJlY2VpdmVyLCBzdGF0ZSwgdmFsdWUsIGtpbmQsIGYpIHtcclxuICAgIGlmIChraW5kID09PSBcIm1cIikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlByaXZhdGUgbWV0aG9kIGlzIG5vdCB3cml0YWJsZVwiKTtcclxuICAgIGlmIChraW5kID09PSBcImFcIiAmJiAhZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlByaXZhdGUgYWNjZXNzb3Igd2FzIGRlZmluZWQgd2l0aG91dCBhIHNldHRlclwiKTtcclxuICAgIGlmICh0eXBlb2Ygc3RhdGUgPT09IFwiZnVuY3Rpb25cIiA/IHJlY2VpdmVyICE9PSBzdGF0ZSB8fCAhZiA6ICFzdGF0ZS5oYXMocmVjZWl2ZXIpKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IHdyaXRlIHByaXZhdGUgbWVtYmVyIHRvIGFuIG9iamVjdCB3aG9zZSBjbGFzcyBkaWQgbm90IGRlY2xhcmUgaXRcIik7XHJcbiAgICByZXR1cm4gKGtpbmQgPT09IFwiYVwiID8gZi5jYWxsKHJlY2VpdmVyLCB2YWx1ZSkgOiBmID8gZi52YWx1ZSA9IHZhbHVlIDogc3RhdGUuc2V0KHJlY2VpdmVyLCB2YWx1ZSkpLCB2YWx1ZTtcclxufVxyXG4iLCJpbXBvcnQgeyBcbiAgQXBwLCBcbiAgUGx1Z2luLCBcbiAgUGx1Z2luU2V0dGluZ1RhYiwgXG4gIFNldHRpbmcsIFxufSBmcm9tICdvYnNpZGlhbic7XG5cblxuZGVjbGFyZSBjbGFzcyBDYXJkVmlld01vZGVQbHVnaW4gZXh0ZW5kcyBQbHVnaW4ge1xuICBzZXR0aW5nczogQ2FyZFZpZXdNb2RlU2V0dGluZ3M7XG4gIGRpc2FibGUoKTogdm9pZDtcbiAgZW5hYmxlKCk6IHZvaWQ7XG4gIHJlZnJlc2goKTogdm9pZDtcbn1cblxuZXhwb3J0IGNsYXNzIENhcmRWaWV3TW9kZVNldHRpbmdzIHtcbiAgZGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgY2FyZFRpdGxlOiBib29sZWFuID0gZmFsc2U7XG4gIGNvbG9yQmFja0dyb3VuZExpZ2h0OiBzdHJpbmcgPSBcInJnYigyNTUsIDI1NSwgMjU1KVwiO1xuICBjb2xvckJhY2tHcm91bmREYXJrOiBzdHJpbmcgPSBcInJnYig5NCwgOTQsIDk0KVwiO1xuICBjb2xvckFjdGl2ZUNhcmRMaWdodDogc3RyaW5nID0gXCJyZ2IoMjU1LCAyNTUsIDI1NSlcIjtcbiAgY29sb3JBY3RpdmVDYXJkRGFyazogc3RyaW5nID0gXCJyZ2IoNzEsIDcxLCA3MSlcIjtcbiAgY29sb3JOb25BY3RpdmVDYXJkRGFyazogc3RyaW5nID0gXCJyZ2IoNzEsIDcxLCA3MSlcIjtcbiAgY29sb3JOb25BY3RpdmVDYXJkTGlnaHQ6IHN0cmluZyA9IFwicmdiKDI1NSwgMjU1LCAyNTUpXCI7XG4gIGNvbG9yRGlmZkJldHdlZW5BY3RpdmU6IG51bWJlciA9IDIwO1xufVxuXG5leHBvcnQgY2xhc3MgQ2FyZFZpZXdNb2RlU2V0dGluZ1RhYiBleHRlbmRzIFBsdWdpblNldHRpbmdUYWIge1xuICBwbHVnaW46IENhcmRWaWV3TW9kZVBsdWdpbjtcbiAgY29uc3RydWN0b3IoYXBwOiBBcHAsIHBsdWdpbjogQ2FyZFZpZXdNb2RlUGx1Z2luKSB7XG4gICAgc3VwZXIoYXBwLCBwbHVnaW4pO1xuICAgIHRoaXMucGx1Z2luID0gcGx1Z2luO1xuICB9XG5cbiAgZGlzcGxheSgpOiB2b2lkIHtcbiAgICBsZXQgeyBjb250YWluZXJFbCB9ID0gdGhpcztcblxuICAgIGNvbnRhaW5lckVsLmVtcHR5KCk7XG5cbiAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcbiAgICAgIC5zZXROYW1lKFwiVG9nZ2xlIENhcmQgVmlld1wiKVxuICAgICAgLnNldERlc2MoXCJUdXJucyBjYXJkIHZpZXcgbW9kZSBvbiBvciBvZmYgZ2xvYmFsbHlcIilcbiAgICAgIC5hZGRUb2dnbGUodG9nZ2xlID0+IHRvZ2dsZS5zZXRWYWx1ZSghdGhpcy5wbHVnaW4uc2V0dGluZ3MuZGlzYWJsZWQpXG4gICAgICAgIC5vbkNoYW5nZSgodmFsdWUpID0+IHtcbiAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5kaXNhYmxlZCA9ICF2YWx1ZTtcbiAgICAgICAgICB0aGlzLnBsdWdpbi5zYXZlRGF0YSh0aGlzLnBsdWdpbi5zZXR0aW5ncyk7XG4gICAgICAgICAgaWYgKHRoaXMucGx1Z2luLnNldHRpbmdzLmRpc2FibGVkKSB7XG4gICAgICAgICAgICB0aGlzLnBsdWdpbi5kaXNhYmxlKCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5wbHVnaW4uZW5hYmxlKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICApXG4gICAgKTtcblxuICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuICAgICAgLnNldE5hbWUoXCJUb2dnbGUgQ2FyZCBUaXRsZVwiKVxuICAgICAgLnNldERlc2MoXCJFeHBlcmltZW50YWw6IFZpZXcgdGl0bGVzIGFzIGNhcmRzLiBFbmFibGUgdGhpcyBvcHRpb24gd2l0aCBFbWJlZGRlZCBOb3RlIFRpdGxlIFBsdWdpbi5cIilcbiAgICAgIC5hZGRUb2dnbGUodG9nZ2xlID0+IHRvZ2dsZS5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy5jYXJkVGl0bGUpXG4gICAgICAgIC5vbkNoYW5nZSgodmFsdWUpID0+IHtcbiAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5jYXJkVGl0bGUgPSB2YWx1ZTtcbiAgICAgICAgICB0aGlzLnBsdWdpbi5zYXZlRGF0YSh0aGlzLnBsdWdpbi5zZXR0aW5ncyk7XG4gICAgICAgICAgdGhpcy5wbHVnaW4ucmVmcmVzaCgpO1xuICAgICAgICB9XG4gICAgICApXG4gICAgKTtcblxuXG4gICAgbmV3IFNldHRpbmcoY29udGFpbmVyRWwpXG4gICAgICAuc2V0TmFtZShcIkJhY2tncm91bmQgQ29sb3IgaW4gTGlnaHQgTW9kZVwiKVxuICAgICAgLnNldERlc2MoXCJTcGVjaWZ5IGJhY2tncm91bmQgY29sb3IgaW4gbGlnaHQgbW9kZVwiKVxuICAgICAgLmNvbnRyb2xFbC5jcmVhdGVFbChcbiAgICAgICAgXCJpbnB1dFwiLFxuICAgICAgICB7XG4gICAgICAgICAgICB0eXBlOiBcImNvbG9yXCIsXG4gICAgICAgICAgICB2YWx1ZTogcmdiVG9IZXgodGhpcy5wbHVnaW4uc2V0dGluZ3MuY29sb3JCYWNrR3JvdW5kTGlnaHQpXG4gICAgICAgIH0sXG4gICAgICAgIChlbCkgPT4ge1xuICAgICAgICAgICAgZWwudmFsdWUgPSByZ2JUb0hleCh0aGlzLnBsdWdpbi5zZXR0aW5ncy5jb2xvckJhY2tHcm91bmRMaWdodCk7XG4gICAgICAgICAgICBlbC5vbmlucHV0ID0gKHsgdGFyZ2V0IH0pID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgY29sb3IgPSBoZXhUb1JnYigodGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnQpLnZhbHVlKTtcblxuICAgICAgICAgICAgICAgIGlmICghY29sb3IpIHJldHVybjtcbiAgICAgICAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5jb2xvckJhY2tHcm91bmRMaWdodCA9IGAke2NvbG9yLnJ9LCAke2NvbG9yLmd9LCAke2NvbG9yLmJ9YDtcbiAgICAgICAgICAgICAgICB0aGlzLnBsdWdpbi5zYXZlRGF0YSh0aGlzLnBsdWdpbi5zZXR0aW5ncylcbiAgICAgICAgICAgICAgICB0aGlzLnBsdWdpbi5yZWZyZXNoKCk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgKTtcbiAgICBcbiAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcbiAgICAgIC5zZXROYW1lKFwiQmFja2dyb3VuZCBDb2xvciBpbiBEYXJrIE1vZGVcIilcbiAgICAgIC5zZXREZXNjKFwiU3BlY2lmeSBiYWNrZ3JvdW5kIGNvbG9yIGluIGRhcmsgbW9kZVwiKVxuICAgICAgLmNvbnRyb2xFbC5jcmVhdGVFbChcbiAgICAgICAgXCJpbnB1dFwiLFxuICAgICAgICB7XG4gICAgICAgICAgICB0eXBlOiBcImNvbG9yXCIsXG4gICAgICAgICAgICB2YWx1ZTogcmdiVG9IZXgodGhpcy5wbHVnaW4uc2V0dGluZ3MuY29sb3JCYWNrR3JvdW5kRGFyaylcbiAgICAgICAgfSxcbiAgICAgICAgKGVsKSA9PiB7XG4gICAgICAgICAgICBlbC52YWx1ZSA9IHJnYlRvSGV4KHRoaXMucGx1Z2luLnNldHRpbmdzLmNvbG9yQmFja0dyb3VuZERhcmspO1xuICAgICAgICAgICAgZWwub25pbnB1dCA9ICh7IHRhcmdldCB9KSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGNvbG9yID0gaGV4VG9SZ2IoKHRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50KS52YWx1ZSk7XG5cbiAgICAgICAgICAgICAgICBpZiAoIWNvbG9yKSByZXR1cm47XG4gICAgICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3MuY29sb3JCYWNrR3JvdW5kRGFyayA9IGAke2NvbG9yLnJ9LCAke2NvbG9yLmd9LCAke2NvbG9yLmJ9YDtcbiAgICAgICAgICAgICAgICB0aGlzLnBsdWdpbi5zYXZlRGF0YSh0aGlzLnBsdWdpbi5zZXR0aW5ncylcbiAgICAgICAgICAgICAgICB0aGlzLnBsdWdpbi5yZWZyZXNoKCk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgKTtcblxuICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuICAgICAgLnNldE5hbWUoXCJBY3RpdmUgQ2FyZCBDb2xvciBpbiBMaWdodCBNb2RlXCIpXG4gICAgICAuc2V0RGVzYyhcIlNwZWNpZnkgYWN0aXZlIGNhcmQgY29sb3IgaW4gbGlnaHQgbW9kZVwiKVxuICAgICAgLmNvbnRyb2xFbC5jcmVhdGVFbChcbiAgICAgICAgXCJpbnB1dFwiLFxuICAgICAgICB7XG4gICAgICAgICAgICB0eXBlOiBcImNvbG9yXCIsXG4gICAgICAgICAgICB2YWx1ZTogcmdiVG9IZXgodGhpcy5wbHVnaW4uc2V0dGluZ3MuY29sb3JBY3RpdmVDYXJkTGlnaHQpXG4gICAgICAgIH0sXG4gICAgICAgIChlbCkgPT4ge1xuICAgICAgICAgICAgZWwudmFsdWUgPSByZ2JUb0hleCh0aGlzLnBsdWdpbi5zZXR0aW5ncy5jb2xvckFjdGl2ZUNhcmRMaWdodCk7XG4gICAgICAgICAgICBlbC5vbmlucHV0ID0gKHsgdGFyZ2V0IH0pID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgY29sb3IgPSBoZXhUb1JnYigodGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnQpLnZhbHVlKTtcblxuICAgICAgICAgICAgICAgIGlmICghY29sb3IpIHJldHVybjtcbiAgICAgICAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5jb2xvckFjdGl2ZUNhcmRMaWdodCA9IGAke2NvbG9yLnJ9LCAke2NvbG9yLmd9LCAke2NvbG9yLmJ9YDtcbiAgICAgICAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5jb2xvck5vbkFjdGl2ZUNhcmRMaWdodCA9IGAke2NvbG9yLnIgLSB0aGlzLnBsdWdpbi5zZXR0aW5ncy5jb2xvckRpZmZCZXR3ZWVuQWN0aXZlfSwgJHtjb2xvci5nIC0gdGhpcy5wbHVnaW4uc2V0dGluZ3MuY29sb3JEaWZmQmV0d2VlbkFjdGl2ZX0sICR7Y29sb3IuYiAtIHRoaXMucGx1Z2luLnNldHRpbmdzLmNvbG9yRGlmZkJldHdlZW5BY3RpdmV9YDsgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2F2ZURhdGEodGhpcy5wbHVnaW4uc2V0dGluZ3MpXG4gICAgICAgICAgICAgICAgdGhpcy5wbHVnaW4ucmVmcmVzaCgpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICk7ICAgIFxuXG4gICAgbmV3IFNldHRpbmcoY29udGFpbmVyRWwpXG4gICAgICAuc2V0TmFtZShcIkFjdGl2ZSBDYXJkIENvbG9yIGluIERhcmsgTW9kZVwiKVxuICAgICAgLnNldERlc2MoXCJTcGVjaWZ5IGFjdGl2ZSBjYXJkIGNvbG9yIGluIGRhcmsgbW9kZVwiKVxuICAgICAgLmNvbnRyb2xFbC5jcmVhdGVFbChcbiAgICAgICAgXCJpbnB1dFwiLFxuICAgICAgICB7XG4gICAgICAgICAgICB0eXBlOiBcImNvbG9yXCIsXG4gICAgICAgICAgICB2YWx1ZTogcmdiVG9IZXgodGhpcy5wbHVnaW4uc2V0dGluZ3MuY29sb3JBY3RpdmVDYXJkRGFyaylcbiAgICAgICAgfSxcbiAgICAgICAgKGVsKSA9PiB7XG4gICAgICAgICAgICBlbC52YWx1ZSA9IHJnYlRvSGV4KHRoaXMucGx1Z2luLnNldHRpbmdzLmNvbG9yQWN0aXZlQ2FyZERhcmspO1xuICAgICAgICAgICAgZWwub25pbnB1dCA9ICh7IHRhcmdldCB9KSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGNvbG9yID0gaGV4VG9SZ2IoKHRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50KS52YWx1ZSk7XG5cbiAgICAgICAgICAgICAgICBpZiAoIWNvbG9yKSByZXR1cm47XG4gICAgICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3MuY29sb3JBY3RpdmVDYXJkRGFyayA9IGAke2NvbG9yLnJ9LCAke2NvbG9yLmd9LCAke2NvbG9yLmJ9YDtcbiAgICAgICAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5jb2xvck5vbkFjdGl2ZUNhcmREYXJrID0gYCR7Y29sb3IuciAtIHRoaXMucGx1Z2luLnNldHRpbmdzLmNvbG9yRGlmZkJldHdlZW5BY3RpdmV9LCAke2NvbG9yLmcgLSB0aGlzLnBsdWdpbi5zZXR0aW5ncy5jb2xvckRpZmZCZXR3ZWVuQWN0aXZlfSwgJHtjb2xvci5iIC0gdGhpcy5wbHVnaW4uc2V0dGluZ3MuY29sb3JEaWZmQmV0d2VlbkFjdGl2ZX1gO1xuICAgICAgICAgICAgICAgIHRoaXMucGx1Z2luLnNhdmVEYXRhKHRoaXMucGx1Z2luLnNldHRpbmdzKVxuICAgICAgICAgICAgICAgIHRoaXMucGx1Z2luLnJlZnJlc2goKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICApO1xuXG5cbiAgICAvLyBTTElERVJcbiAgICAvLyBuZXcgU2V0dGluZyhjb250YWluZXJFbClcbiAgICAvLyAgIC5zZXROYW1lKCdEaWZmIEJldHdlZW4gQWN0aXZlICYgTm9uQWN0aXZlIENhcmRzJylcbiAgICAvLyAgIC5zZXREZXNjKCdTcGNpZml5IENvbG9yIGRpZmZlcmVuY2UgYmV0d2VlbiBhY3RpdmUgJiBub24gYWN0aXZlIGNhcmRzLiBTZXQgMCB0byBkaWFibGUgXCJBdHRlbnRpb24gcGFuZVwiJylcbiAgICAvLyAgIC5hZGRTbGlkZXIoc2xpZGVyID0+IHNsaWRlclxuICAgIC8vICAgICAuc2V0TGltaXRzKDEwMCwgMTAwLCA1KVxuICAgIC8vICAgICAuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3MuY29sb3JEaWZmQmV0d2VlbkFjdGl2ZSlcbiAgICAvLyAgICAgLm9uQ2hhbmdlKCh2YWx1ZSkgPT4ge1xuICAgIC8vICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLmNvbG9yRGlmZkJldHdlZW5BY3RpdmUgPSB2YWx1ZTtcbiAgICAvLyAgICAgICBsZXQgYWN0aXZlQ29sb3JMaWdodCA9IGhleFRvUmdiKHJnYlRvSGV4KHRoaXMucGx1Z2luLnNldHRpbmdzLmNvbG9yQWN0aXZlQ2FyZERhcmspKTtcbiAgICAvLyAgICAgICBsZXQgYWN0aXZlQ29sb3JEYXJrID0gaGV4VG9SZ2IocmdiVG9IZXgodGhpcy5wbHVnaW4uc2V0dGluZ3MuY29sb3JBY3RpdmVDYXJkRGFyaykpO1xuICAgIC8vICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLmNvbG9yTm9uQWN0aXZlQ2FyZExpZ2h0ID0gYCR7YWN0aXZlQ29sb3JMaWdodC5yIC0gdmFsdWV9LCAke2FjdGl2ZUNvbG9yTGlnaHQuZyAtIHZhbHVlfSwgJHthY3RpdmVDb2xvckxpZ2h0LmIgLSB2YWx1ZX1gO1xuICAgIC8vICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLmNvbG9yTm9uQWN0aXZlQ2FyZERhcmsgPSBgJHthY3RpdmVDb2xvckRhcmsuciAtIHZhbHVlfSwgJHthY3RpdmVDb2xvckRhcmsuZyAtIHZhbHVlfSwgJHthY3RpdmVDb2xvckRhcmsuYiAtIHZhbHVlfWA7XG4gICAgLy8gICAgICAgdGhpcy5wbHVnaW4uc2F2ZURhdGEodGhpcy5wbHVnaW4uc2V0dGluZ3MpO1xuICAgIC8vICAgICAgIHRoaXMucGx1Z2luLnJlZnJlc2goKTtcbiAgICAvLyAgICAgfSlcbiAgICAvLyApO1xuXG4gICAgbmV3IFNldHRpbmcoY29udGFpbmVyRWwpXG4gICAgICAuc2V0TmFtZSgnRGlmZiBCZXR3ZWVuIEFjdGl2ZSAmIE5vbkFjdGl2ZSBDYXJkcycpXG4gICAgICAuc2V0RGVzYygnU3BjaWZpeSBDb2xvciBkaWZmZXJlbmNlIGJldHdlZW4gYWN0aXZlICYgbm9uIGFjdGl2ZSBjYXJkcy4gU2V0IDAgdG8gZGlhYmxlIFwiQXR0ZW50aW9uIHBhbmVcIicpXG4gICAgICAuYWRkVGV4dCh0ZXh0ID0+IHRleHQuc2V0UGxhY2Vob2xkZXIoJ0V4YW1wbGU6IDcwMCcpXG4gICAgICAgIC5zZXRWYWx1ZSgodGhpcy5wbHVnaW4uc2V0dGluZ3MuY29sb3JEaWZmQmV0d2VlbkFjdGl2ZSB8fCAnJykgKyAnJylcbiAgICAgICAgLnNldFBsYWNlaG9sZGVyKCdkZWZhbHV0OiAyMCcpXG4gICAgICAgIC5vbkNoYW5nZSgodmFsdWUpID0+IHtcbiAgICAgICAgICBsZXQgbnUgPSBOdW1iZXIodmFsdWUpXG4gICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3MuY29sb3JEaWZmQmV0d2VlbkFjdGl2ZSA9IG51O1xuICAgICAgICAgIGxldCBhY3RpdmVDb2xvckxpZ2h0ID0gaGV4VG9SZ2IocmdiVG9IZXgodGhpcy5wbHVnaW4uc2V0dGluZ3MuY29sb3JBY3RpdmVDYXJkRGFyaykpO1xuICAgICAgICAgIGxldCBhY3RpdmVDb2xvckRhcmsgPSBoZXhUb1JnYihyZ2JUb0hleCh0aGlzLnBsdWdpbi5zZXR0aW5ncy5jb2xvckFjdGl2ZUNhcmREYXJrKSk7XG4gICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3MuY29sb3JOb25BY3RpdmVDYXJkTGlnaHQgPSBgJHthY3RpdmVDb2xvckxpZ2h0LnIgLSBudX0sICR7YWN0aXZlQ29sb3JMaWdodC5nIC0gbnV9LCAke2FjdGl2ZUNvbG9yTGlnaHQuYiAtIG51fWA7XG4gICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3MuY29sb3JOb25BY3RpdmVDYXJkRGFyayA9IGAke2FjdGl2ZUNvbG9yRGFyay5yIC0gbnV9LCAke2FjdGl2ZUNvbG9yRGFyay5nIC0gbnV9LCAke2FjdGl2ZUNvbG9yRGFyay5iIC0gbnV9YDtcbiAgICAgICAgICB0aGlzLnBsdWdpbi5zYXZlRGF0YSh0aGlzLnBsdWdpbi5zZXR0aW5ncyk7XG4gICAgICAgICAgdGhpcy5wbHVnaW4ucmVmcmVzaCgpO1xuICAgICAgICB9KVxuICAgICAgKTtcblxuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBDYXJkVmlld01vZGVDb21tYW5kcyB7XG4gIHBsdWdpbjogQ2FyZFZpZXdNb2RlUGx1Z2luO1xuICBjb25zdHJ1Y3RvcihwbHVnaW46IENhcmRWaWV3TW9kZVBsdWdpbikge1xuICAgIHRoaXMucGx1Z2luID0gcGx1Z2luO1xuICB9XG5cbiAgYWRkVG9nZ2xlU2V0dGluZ0NvbW1hbmQoaWQ6c3RyaW5nLCBuYW1lOnN0cmluZywgc2V0dGluZ05hbWU6c3RyaW5nKSB7XG4gICAgdGhpcy5wbHVnaW4uYWRkQ29tbWFuZCh7XG4gICAgICBpZDogaWQsXG4gICAgICBuYW1lOiBuYW1lLFxuICAgICAgY2FsbGJhY2s6ICgpID0+IHtcbiAgICAgICAgLy8gc3dpdGNoIHRoZSBzZXR0aW5nLCBzYXZlIGFuZCByZWZyZXNoXG4gICAgICAgIC8vQHRzLWlnbm9yZVxuICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5nc1tzZXR0aW5nTmFtZV0gPSAhdGhpcy5wbHVnaW4uc2V0dGluZ3Nbc2V0dGluZ05hbWVdO1xuICAgICAgICB0aGlzLnBsdWdpbi5zYXZlRGF0YSh0aGlzLnBsdWdpbi5zZXR0aW5ncyk7XG4gICAgICAgIHRoaXMucGx1Z2luLnJlZnJlc2goKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGFkZENvbW1hbmRzKCk6IHZvaWQge1xuICAgIHRoaXMucGx1Z2luLmFkZENvbW1hbmQoe1xuICAgICAgaWQ6ICd0b2dnbGUtY2FyZC12aWV3LW1vZGUnLFxuICAgICAgbmFtZTogJ1RvZ2dsZSBDYXJkIFZpZXcnLFxuICAgICAgY2FsbGJhY2s6ICgpID0+IHtcbiAgICAgICAgLy8gc3dpdGNoIHRoZSBkaXNhYmxlZCBzZXR0aW5nIGFuZCBzYXZlXG4gICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLmRpc2FibGVkID0gIXRoaXMucGx1Z2luLnNldHRpbmdzLmRpc2FibGVkO1xuICAgICAgICB0aGlzLnBsdWdpbi5zYXZlRGF0YSh0aGlzLnBsdWdpbi5zZXR0aW5ncyk7XG5cbiAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3MuZGlzYWJsZWQgPyB0aGlzLnBsdWdpbi5kaXNhYmxlKCkgOiB0aGlzLnBsdWdpbi5lbmFibGUoKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHRoaXMuYWRkVG9nZ2xlU2V0dGluZ0NvbW1hbmQoJ3RvZ2dsZS1jYXJkLXRpdGxlJywgJ1RvZ2dsZSBDYXJkIFRpdGxlJywgJ2NhcmRUaXRsZScpO1xuICB9XG59XG5cblxuZnVuY3Rpb24gaGV4VG9SZ2IoaGV4OiBzdHJpbmcpIHtcbiAgICBsZXQgcmVzdWx0ID0gL14jPyhbYS1mXFxkXXsyfSkoW2EtZlxcZF17Mn0pKFthLWZcXGRdezJ9KSQvaS5leGVjKGhleCk7XG5cbiAgICByZXR1cm4gcmVzdWx0XG4gICAgICAgID8ge1xuICAgICAgICAgICAgICByOiBwYXJzZUludChyZXN1bHRbMV0sIDE2KSxcbiAgICAgICAgICAgICAgZzogcGFyc2VJbnQocmVzdWx0WzJdLCAxNiksXG4gICAgICAgICAgICAgIGI6IHBhcnNlSW50KHJlc3VsdFszXSwgMTYpXG4gICAgICAgICAgfVxuICAgICAgICA6IG51bGw7XG59XG5mdW5jdGlvbiBjb21wb25lbnRUb0hleChjOiBudW1iZXIpIHtcbiAgICB2YXIgaGV4ID0gYy50b1N0cmluZygxNik7XG4gICAgcmV0dXJuIGhleC5sZW5ndGggPT0gMSA/IFwiMFwiICsgaGV4IDogaGV4O1xufVxuZnVuY3Rpb24gcmdiVG9IZXgocmdiOiBzdHJpbmcpIHtcbiAgICBsZXQgcmVzdWx0ID0gL14oXFxkKyksXFxzPyhcXGQrKSxcXHM/KFxcZCspL2kuZXhlYyhyZ2IpO1xuICAgIGlmICghcmVzdWx0IHx8ICFyZXN1bHQubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiBcIlwiO1xuICAgIH1cbiAgICByZXR1cm4gYCMke2NvbXBvbmVudFRvSGV4KE51bWJlcihyZXN1bHRbMV0pKX0ke2NvbXBvbmVudFRvSGV4KFxuICAgICAgICBOdW1iZXIocmVzdWx0WzJdKVxuICAgICl9JHtjb21wb25lbnRUb0hleChOdW1iZXIocmVzdWx0WzNdKSl9YDtcbn1cbiIsImltcG9ydCAnLi9zdHlsZXMuc2NzcydcbmltcG9ydCB7IFBsdWdpbiB9IGZyb20gJ29ic2lkaWFuJztcbmltcG9ydCB7IFxuICBDYXJkVmlld01vZGVTZXR0aW5ncywgXG4gIENhcmRWaWV3TW9kZVNldHRpbmdUYWIsIFxuICBDYXJkVmlld01vZGVDb21tYW5kcyBcbn0gZnJvbSAnLi9zZXR0aW5ncyc7XG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2FyZFZpZXdNb2RlUGx1Z2luIGV4dGVuZHMgUGx1Z2luIHtcbiAgc2V0dGluZ3M6IENhcmRWaWV3TW9kZVNldHRpbmdzO1xuXG4gIGFzeW5jIG9ubG9hZCgpIHtcbiAgICAgIHRoaXMuc2V0dGluZ3MgPSBPYmplY3QuYXNzaWduKG5ldyBDYXJkVmlld01vZGVTZXR0aW5ncygpLCBhd2FpdCB0aGlzLmxvYWREYXRhKCkpO1xuICAgICAgaWYgKCF0aGlzLnNldHRpbmdzLmRpc2FibGVkKSB0aGlzLmVuYWJsZSgpO1xuICAgICAgdGhpcy5hZGRTZXR0aW5nVGFiKG5ldyBDYXJkVmlld01vZGVTZXR0aW5nVGFiKHRoaXMuYXBwLCB0aGlzKSk7XG4gICAgICBuZXcgQ2FyZFZpZXdNb2RlQ29tbWFuZHModGhpcykuYWRkQ29tbWFuZHMoKTtcbiAgfVxuXG4gIG9udW5sb2FkKCl7XG4gICAgdGhpcy5kaXNhYmxlKCk7XG4gIH0gICBcblxuICBlbmFibGUgPSAoKSA9PiB7XG4gICAgdGhpcy5yZWdpc3RlckV2ZW50KHRoaXMuYXBwLndvcmtzcGFjZS5vbigncmVzaXplJywgdGhpcy5oYW5kbGVSZXNpemUpKTtcbiAgICB0aGlzLmFwcC53b3Jrc3BhY2UubGF5b3V0UmVhZHkgPyB0aGlzLnJlYWxseUVuYWJsZSgpIDogdGhpcy5hcHAud29ya3NwYWNlLm9uKCdsYXlvdXQtY2hhbmdlJywgdGhpcy5yZWFsbHlFbmFibGUpO1xuICB9XG5cblxuICByZWFsbHlFbmFibGUgPSAoKSA9PiB7XG4gICAgdGhpcy5hcHAud29ya3NwYWNlLm9mZignbGF5b3V0LXJlYWR5JywgdGhpcy5yZWFsbHlFbmFibGUpO1xuICAgIHRoaXMuYWRkU3R5bGUoKTtcbiAgICB0aGlzLm9ic2VydmVMZWFmV2lkdGgoKTtcbiAgfVxuXG4gIGRpc2FibGUgPSAoKSA9PiB7XG4gICAgdGhpcy5yZW1vdmVTdHlsZSgpO1xuICAgIFxuICB9XG5cbiAgcmVmcmVzaCA9ICgpID0+IHtcbiAgICB0aGlzLnVwZGF0ZVN0eWxlKClcbiAgICB0aGlzLm9ic2VydmVMZWFmV2lkdGgoKTtcbiAgfVxuXG4gIHJlbW92ZVN0eWxlID0gKCkgPT4ge1xuICAgIC8vIGNvbnN0IGVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BsdWdpbi1jYXJkLXZpZXctbW9kZScpO1xuICAgIC8vIGlmIChlbCkgZWwucmVtb3ZlKCk7XG4gICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QucmVtb3ZlKCdwbHVnaW4tY2FyZC12aWV3LW1vZGUnKTtcbiAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoJ3BsdWdpbi1jYXJkLXZpZXctbW9kZS1jYXJkdGl0bGUnKTtcblxuICAgIC8vIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2xhc3MoJ3BsdWdpbi1jYXJkLXZpZXctbW9kZScsICdwbHVnaW4tY2FyZC12aWV3LW1vZGUtY2FyZHRpdGxlJyk7XG4gIH1cblxuICBhZGRTdHlsZSA9ICgpID0+IHtcbiAgICAvLyBjb25zdCBjc3MgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuICAgIC8vIGNzcy5pZCA9ICdwbHVnaW4tY2FyZC12aWV3LW1vZGUtY2FyZHRpdGxlJztcbiAgICAvLyBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImhlYWRcIilbMF0uYXBwZW5kQ2hpbGQoY3NzKTtcblxuICAgIC8vIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZCgncGx1Z2luLWNhcmQtdmlldy1tb2RlJyk7XG4gICAgLy8gdGhpcy51cGRhdGVTdHlsZSgpO1xuXG4gICAgY29uc3QgY3NzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbiAgICBjc3MuaWQgPSAncGx1Z2luLWNhcmQtdmlldy1tb2RlJztcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImhlYWRcIilbMF0uYXBwZW5kQ2hpbGQoY3NzKTtcblxuICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZCgncGx1Z2luLWNhcmQtdmlldy1tb2RlJyk7XG4gICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKCdwbHVnaW4tY2FyZC12aWV3LW1vZGUtY2FyZHRpdGxlJyk7XG4gICAgdGhpcy51cGRhdGVTdHlsZSgpO1xuICB9XG4gIFxuICB1cGRhdGVTdHlsZSA9ICgpID0+IHtcbiAgICAvLyAxLiByZW1vdmUgc3R5bGUgYmVmb3JlIGNoYW5naW5nXG4gICAgLy8gdGhpcy5yZW1vdmVTdHlsZSgpO1xuICAgIC8vIOOBk+OCjOOChOOCi+OBqOOCueOCv+OCpOODq+abtOaWsOOBleOCjOOBquOBhFxuXG4gICAgLy8gMi1hLiB1cGRhdGUgYm9vbGVhbiBzZXR0aW5nc1xuICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnRvZ2dsZSgncGx1Z2luLWNhcmQtdmlldy1tb2RlLWNhcmR0aXRsZScsIHRoaXMuc2V0dGluZ3MuY2FyZFRpdGxlKTtcblxuICAgIC8vIDItYi4gdXBkYWF0ZSBjdXN0b20gY3NzIHByb3BlcnRpZXNcbiAgICBjb25zdCBlbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwbHVnaW4tY2FyZC12aWV3LW1vZGUnKTtcbiAgICBpZiAoIWVsKSB0aHJvdyBcInBsdWdpbi1jYXJkLXZpZXctbW9kZSBlbGVtZW50IG5vdCBmb3VuZCFcIjtcbiAgICBlbHNlIHtcbiAgICAgICAgZWwuaW5uZXJUZXh0ID0gYFxuICAgICAgICBib2R5LnBsdWdpbi1jYXJkLXZpZXctbW9kZS50aGVtZS1saWdodHtcbiAgICAgICAgICAtLWNhcmR2aWV3LWNhcmQtY29sb3ItYWN0aXZlOiByZ2IoJHt0aGlzLnNldHRpbmdzLmNvbG9yQWN0aXZlQ2FyZExpZ2h0fSk7XG4gICAgICAgICAgLS1jYXJkdmlldy1jYXJkLWNvbG9yLW5vbi1hY3RpdmU6IHJnYigke3RoaXMuc2V0dGluZ3MuY29sb3JOb25BY3RpdmVDYXJkTGlnaHR9KTtcbiAgICAgICAgICAtLWNhcmR2aWV3LWJhY2tncm91bmQtY29sb3ItZGVmYXVsdDogcmdiKCR7dGhpcy5zZXR0aW5ncy5jb2xvckJhY2tHcm91bmRMaWdodH0pO1xuICAgICAgICB9XG4gICAgICAgIGJvZHkucGx1Z2luLWNhcmQtdmlldy1tb2RlLnRoZW1lLWRhcmt7XG4gICAgICAgICAgLS1jYXJkdmlldy1jYXJkLWNvbG9yLWFjdGl2ZTogcmdiKCR7dGhpcy5zZXR0aW5ncy5jb2xvckFjdGl2ZUNhcmREYXJrfSk7XG4gICAgICAgICAgLS1jYXJkdmlldy1jYXJkLWNvbG9yLW5vbi1hY3RpdmU6IHJnYigke3RoaXMuc2V0dGluZ3MuY29sb3JOb25BY3RpdmVDYXJkRGFya30pO1xuICAgICAgICAgIC0tY2FyZHZpZXctYmFja2dyb3VuZC1jb2xvci1kZWZhdWx0OiByZ2IoJHt0aGlzLnNldHRpbmdzLmNvbG9yQmFja0dyb3VuZERhcmt9KTtcbiAgICAgICAgfVxuICAgICAgICBgO1xuICAgIH1cbiAgfVxuXG4gIGhhbmRsZVJlc2l6ZSA9ICgpID0+IHtcbiAgICBpZiAodGhpcy5hcHAud29ya3NwYWNlLmxheW91dFJlYWR5KSB7XG4gICAgICB0aGlzLm9ic2VydmVMZWFmV2lkdGgoKTtcbiAgICB9XG4gIH1cbiBcbiAgb2JzZXJ2ZUxlYWZXaWR0aCA9ICgpID0+IHtcbiAgICBjb25zdCBjYXJkVGl0bGVXaWR0aExpc3QgPSA8Tm9kZUxpc3RPZjxIVE1MRWxlbWVudD4+ZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmVtYmVkZGVkLW5vdGUtdGl0bGVzIC5Db2RlTWlycm9yLXNjcm9sbD5oMVtpZCo9XCJ0aXRsZS1cIl0nKTtcbiAgICBjb25zdCBwYW5lTGVhZldpZHRoID0gPE5vZGVMaXN0T2Y8SFRNTEVsZW1lbnQ+PmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5Db2RlTWlycm9yLXNpemVyIC5Db2RlTWlycm9yLWxpbmVzPmRpdltyb2xlPVwicHJlc2VudGF0aW9uXCJdJyk7XG4gICAgXG5cbiAgICAvLyDjgrPjg7Pjgrnjg4jjg6njgq/jgr/jgajjgrPjg7zjg6vjg5Djg4Pjgq9cbiAgICBjb25zdCByZXNpemVPYnNlcnZlciA9IG5ldyBSZXNpemVPYnNlcnZlcihlbnRyaWVzID0+IHtcbiAgICAgIFxuICAgICAgZm9yKGxldCBpID0gMDsgaSA8IGVudHJpZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgbGV0IGVudHJ5ID0gZW50cmllc1tpXTtcbiAgICAgICAgaWYoZW50cnkuY29udGVudFJlY3Qpe1xuICAgICAgICAgIGNhcmRUaXRsZVdpZHRoTGlzdFtpXS5zdHlsZS53aWR0aCA9IFN0cmluZyhlbnRyeS5jb250ZW50UmVjdC53aWR0aCArIDYpICsgYHB4YDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgZm9yKGxldCBrID0wOyBrIDwgcGFuZUxlYWZXaWR0aC5sZW5ndGg7IGsrKyl7XG4gICAgICByZXNpemVPYnNlcnZlci5vYnNlcnZlKHBhbmVMZWFmV2lkdGhba10pO1xuICAgIH1cblxuICB9XG5cbiAgLy8gZml4aWZyID0gKCkgPT4geyAgXG4gIC8vICAgLy/jgIBpZnJhbWXjgr/jgrDjga5FbGVtZW5044Oq44K544OI44KSaWZyT2Jqc+OCquODluOCuOOCp+OCr+ODiOOBq+WPluOCiui+vOOCgCAgXG4gIC8vICAgdmFyIGlmck9ianM9ZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJpZnJhbWVcIik7ICBcbiAgLy8gIC8vIGlmcmFtZeOCv+OCsOOBjOikh+aVsOWAi+OBguOCi+WgtOWQiOOAgeWQhGlmcmFtZeOCv+OCsOOBq+OBpOOBhOOBpuihqOekuuOBleOCjOOCi+ODmuODvOOCuOOBrumrmOOBleOBq2lmcmFtZeOBrumrmOOBleOCkuiqv+aVtOOBmeOCiyBcbiAgLy8gICBmb3IobGV0IGk9MDsgaTxpZnJPYmpzLmxlbmd0aDtpKyspe1xuICAvLyAgICAgICAgdmFyIGlmck9iaiA9IGlmck9ianMuaXRlbShpKTtcbiAgLy8gICAgICAgIGlmck9iai5oZWlnaHQgPSBgaWZyT2JqLmNvbnRlbnREb2N1bWVudC5ib2R5LnNjcm9sbEhlaWdodGA7XG4gIC8vICAgIH1cbiAgLy8gfVxuXG5cbn1cblxuIl0sIm5hbWVzIjpbIlNldHRpbmciLCJQbHVnaW5TZXR0aW5nVGFiIiwiUGx1Z2luIl0sIm1hcHBpbmdzIjoiOzs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLGFBQWEsR0FBRyxTQUFTLENBQUMsRUFBRSxDQUFDLEVBQUU7QUFDbkMsSUFBSSxhQUFhLEdBQUcsTUFBTSxDQUFDLGNBQWM7QUFDekMsU0FBUyxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsWUFBWSxLQUFLLElBQUksVUFBVSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDO0FBQ3BGLFFBQVEsVUFBVSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxNQUFNLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0FBQzFHLElBQUksT0FBTyxhQUFhLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQy9CLENBQUMsQ0FBQztBQUNGO0FBQ08sU0FBUyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRTtBQUNoQyxJQUFJLElBQUksT0FBTyxDQUFDLEtBQUssVUFBVSxJQUFJLENBQUMsS0FBSyxJQUFJO0FBQzdDLFFBQVEsTUFBTSxJQUFJLFNBQVMsQ0FBQyxzQkFBc0IsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsK0JBQStCLENBQUMsQ0FBQztBQUNsRyxJQUFJLGFBQWEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDeEIsSUFBSSxTQUFTLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDLEVBQUU7QUFDM0MsSUFBSSxDQUFDLENBQUMsU0FBUyxHQUFHLENBQUMsS0FBSyxJQUFJLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxTQUFTLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQ3pGLENBQUM7QUF1Q0Q7QUFDTyxTQUFTLFNBQVMsQ0FBQyxPQUFPLEVBQUUsVUFBVSxFQUFFLENBQUMsRUFBRSxTQUFTLEVBQUU7QUFDN0QsSUFBSSxTQUFTLEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxPQUFPLEtBQUssWUFBWSxDQUFDLEdBQUcsS0FBSyxHQUFHLElBQUksQ0FBQyxDQUFDLFVBQVUsT0FBTyxFQUFFLEVBQUUsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUU7QUFDaEgsSUFBSSxPQUFPLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxPQUFPLENBQUMsRUFBRSxVQUFVLE9BQU8sRUFBRSxNQUFNLEVBQUU7QUFDL0QsUUFBUSxTQUFTLFNBQVMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO0FBQ25HLFFBQVEsU0FBUyxRQUFRLENBQUMsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO0FBQ3RHLFFBQVEsU0FBUyxJQUFJLENBQUMsTUFBTSxFQUFFLEVBQUUsTUFBTSxDQUFDLElBQUksR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxRQUFRLENBQUMsQ0FBQyxFQUFFO0FBQ3RILFFBQVEsSUFBSSxDQUFDLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLFVBQVUsSUFBSSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0FBQzlFLEtBQUssQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQUNEO0FBQ08sU0FBUyxXQUFXLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRTtBQUMzQyxJQUFJLElBQUksQ0FBQyxHQUFHLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDckgsSUFBSSxPQUFPLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsT0FBTyxNQUFNLEtBQUssVUFBVSxLQUFLLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsV0FBVyxFQUFFLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUM3SixJQUFJLFNBQVMsSUFBSSxDQUFDLENBQUMsRUFBRSxFQUFFLE9BQU8sVUFBVSxDQUFDLEVBQUUsRUFBRSxPQUFPLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFO0FBQ3RFLElBQUksU0FBUyxJQUFJLENBQUMsRUFBRSxFQUFFO0FBQ3RCLFFBQVEsSUFBSSxDQUFDLEVBQUUsTUFBTSxJQUFJLFNBQVMsQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDO0FBQ3RFLFFBQVEsT0FBTyxDQUFDLEVBQUUsSUFBSTtBQUN0QixZQUFZLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQ3pLLFlBQVksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUNwRCxZQUFZLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUN6QixnQkFBZ0IsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsTUFBTTtBQUM5QyxnQkFBZ0IsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsT0FBTyxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxDQUFDO0FBQ3hFLGdCQUFnQixLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTO0FBQ2pFLGdCQUFnQixLQUFLLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxTQUFTO0FBQ2pFLGdCQUFnQjtBQUNoQixvQkFBb0IsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLFNBQVMsRUFBRTtBQUNoSSxvQkFBb0IsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBRTtBQUMxRyxvQkFBb0IsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FB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
