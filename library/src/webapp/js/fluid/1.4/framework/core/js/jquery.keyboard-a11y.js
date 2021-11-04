var fluid_1_4=fluid_1_4||{};var fluid=fluid||fluid_1_4;(function($,fluid){fluid.thatistBridge=function(name,peer){var togo=function(funcname){var segs=funcname.split(".");var move=peer;for(var i=0;i<segs.length;++i){move=move[segs[i]]}var args=[this];if(arguments.length===2){args=args.concat($.makeArray(arguments[1]))}var ret=move.apply(null,args);this.that=function(){return ret};var type=typeof (ret);return !ret||type==="string"||type==="number"||type==="boolean"||ret&&ret.length!==undefined?ret:this};$.fn[name]=togo;return togo};fluid.thatistBridge("fluid",fluid);fluid.thatistBridge("fluid_1_4",fluid_1_4);var normalizeTabindexName=function(){return $.browser.msie?"tabIndex":"tabindex"};var canHaveDefaultTabindex=function(elements){if(elements.length<=0){return false}return $(elements[0]).is("a, input, button, select, area, textarea, object")};var getValue=function(elements){if(elements.length<=0){return undefined}if(!fluid.tabindex.hasAttr(elements)){return canHaveDefaultTabindex(elements)?Number(0):undefined}var value=elements.attr(normalizeTabindexName());return Number(value)};var setValue=function(elements,toIndex){return elements.each(function(i,item){$(item).attr(normalizeTabindexName(),toIndex)})};fluid.tabindex=function(target,toIndex){target=$(target);if(toIndex!==null&&toIndex!==undefined){return setValue(target,toIndex)}else{return getValue(target)}};fluid.tabindex.remove=function(target){target=$(target);return target.each(function(i,item){$(item).removeAttr(normalizeTabindexName())})};fluid.tabindex.hasAttr=function(target){target=$(target);if(target.length<=0){return false}var togo=target.map(function(){var attributeNode=this.getAttributeNode(normalizeTabindexName());return attributeNode?attributeNode.specified:false});return togo.length===1?togo[0]:togo};fluid.tabindex.has=function(target){target=$(target);return fluid.tabindex.hasAttr(target)||canHaveDefaultTabindex(target)};fluid.a11y=$.a11y||{};fluid.a11y.orientation={HORIZONTAL:0,VERTICAL:1,BOTH:2};var UP_DOWN_KEYMAP={next:$.ui.keyCode.DOWN,previous:$.ui.keyCode.UP};var LEFT_RIGHT_KEYMAP={next:$.ui.keyCode.RIGHT,previous:$.ui.keyCode.LEFT};var unwrap=function(element){return element.jquery?element[0]:element};var makeElementsTabFocussable=function(elements){elements.each(function(idx,item){item=$(item);if(!item.fluid("tabindex.has")||item.fluid("tabindex")<0){item.fluid("tabindex",0)}})};fluid.tabbable=function(target){target=$(target);makeElementsTabFocussable(target)};var CONTEXT_KEY="selectionContext";var NO_SELECTION=-32768;var cleanUpWhenLeavingContainer=function(selectionContext){if(selectionContext.activeItemIndex!==NO_SELECTION){if(selectionContext.options.onLeaveContainer){selectionContext.options.onLeaveContainer(selectionContext.selectables[selectionContext.activeItemIndex])}else{if(selectionContext.options.onUnselect){selectionContext.options.onUnselect(selectionContext.selectables[selectionContext.activeItemIndex])}}}if(!selectionContext.options.rememberSelectionState){selectionContext.activeItemIndex=NO_SELECTION}};var drawSelection=function(elementToSelect,handler){if(handler){handler(elementToSelect)}};var eraseSelection=function(selectedElement,handler){if(handler&&selectedElement){handler(selectedElement)}};var unselectElement=function(selectedElement,selectionContext){eraseSelection(selectedElement,selectionContext.options.onUnselect)};var selectElement=function(elementToSelect,selectionContext){unselectElement(selectionContext.selectedElement(),selectionContext);elementToSelect=unwrap(elementToSelect);var newIndex=selectionContext.selectables.index(elementToSelect);if(newIndex===-1){return }selectionContext.activeItemIndex=newIndex;drawSelection(elementToSelect,selectionContext.options.onSelect)};var selectableFocusHandler=function(selectionContext){return function(evt){$(evt.target).fluid("tabindex",0);selectElement(evt.target,selectionContext);return evt.stopPropagation()}};var selectableBlurHandler=function(selectionContext){return function(evt){$(evt.target).fluid("tabindex",selectionContext.options.selectablesTabindex);unselectElement(evt.target,selectionContext);return evt.stopPropagation()}};var reifyIndex=function(sc_that){var elements=sc_that.selectables;if(sc_that.activeItemIndex>=elements.length){sc_that.activeItemIndex=0}if(sc_that.activeItemIndex<0&&sc_that.activeItemIndex!==NO_SELECTION){sc_that.activeItemIndex=elements.length-1}if(sc_that.activeItemIndex>=0){fluid.focus(elements[sc_that.activeItemIndex])}};var prepareShift=function(selectionContext){var selElm=selectionContext.selectedElement();if(selElm){fluid.blur(selElm)}unselectElement(selectionContext.selectedElement(),selectionContext);if(selectionContext.activeItemIndex===NO_SELECTION){selectionContext.activeItemIndex=-1}};var focusNextElement=function(selectionContext){prepareShift(selectionContext);++selectionContext.activeItemIndex;reifyIndex(selectionContext)};var focusPreviousElement=function(selectionContext){prepareShift(selectionContext);--selectionContext.activeItemIndex;reifyIndex(selectionContext)};var arrowKeyHandler=function(selectionContext,keyMap,userHandlers){return function(evt){if(evt.which===keyMap.next){focusNextElement(selectionContext);evt.preventDefault()}else{if(evt.which===keyMap.previous){focusPreviousElement(selectionContext);evt.preventDefault()}}}};var getKeyMapForDirection=function(direction){var keyMap;if(direction===fluid.a11y.orientation.HORIZONTAL){keyMap=LEFT_RIGHT_KEYMAP}else{if(direction===fluid.a11y.orientation.VERTICAL){keyMap=UP_DOWN_KEYMAP}}return keyMap};var tabKeyHandler=function(selectionContext){return function(evt){if(evt.which!==$.ui.keyCode.TAB){return }cleanUpWhenLeavingContainer(selectionContext);if(evt.shiftKey){selectionContext.focusIsLeavingContainer=true}}};var containerFocusHandler=function(selectionContext){return function(evt){var shouldOrig=selectionContext.options.autoSelectFirstItem;var shouldSelect=typeof (shouldOrig)==="function"?shouldOrig():shouldOrig;if(selectionContext.focusIsLeavingContainer){shouldSelect=false}if(shouldSelect&&evt.target===selectionContext.container.get(0)){if(selectionContext.activeItemIndex===NO_SELECTION){selectionContext.activeItemIndex=0}fluid.focus(selectionContext.selectables[selectionContext.activeItemIndex])}return evt.stopPropagation()}};var containerBlurHandler=function(selectionContext){return function(evt){selectionContext.focusIsLeavingContainer=false;return evt.stopPropagation()}};var makeElementsSelectable=function(container,defaults,userOptions){var options=$.extend(true,{},defaults,userOptions);var keyMap=getKeyMapForDirection(options.direction);var selectableElements=options.selectableElements?options.selectableElements:container.find(options.selectableSelector);var that={container:container,activeItemIndex:NO_SELECTION,selectables:selectableElements,focusIsLeavingContainer:false,options:options};that.selectablesUpdated=function(focusedItem){if(typeof (that.options.selectablesTabindex)==="number"){that.selectables.fluid("tabindex",that.options.selectablesTabindex)}that.selectables.unbind("focus."+CONTEXT_KEY);that.selectables.unbind("blur."+CONTEXT_KEY);that.selectables.bind("focus."+CONTEXT_KEY,selectableFocusHandler(that));that.selectables.bind("blur."+CONTEXT_KEY,selectableBlurHandler(that));if(keyMap&&that.options.noBubbleListeners){that.selectables.unbind("keydown."+CONTEXT_KEY);that.selectables.bind("keydown."+CONTEXT_KEY,arrowKeyHandler(that,keyMap))}if(focusedItem){selectElement(focusedItem,that)}else{reifyIndex(that)}};that.refresh=function(){if(!that.options.selectableSelector){throw ("Cannot refresh selectable context which was not initialised by a selector")}that.selectables=container.find(options.selectableSelector);that.selectablesUpdated()};that.selectedElement=function(){return that.activeItemIndex<0?null:that.selectables[that.activeItemIndex]};if(keyMap&&!that.options.noBubbleListeners){container.keydown(arrowKeyHandler(that,keyMap))}container.keydown(tabKeyHandler(that));container.focus(containerFocusHandler(that));container.blur(containerBlurHandler(that));that.selectablesUpdated();return that};fluid.selectable=function(target,options){target=$(target);var that=makeElementsSelectable(target,fluid.selectable.defaults,options);fluid.setScopedData(target,CONTEXT_KEY,that);return that};fluid.selectable.select=function(target,toSelect){fluid.focus(toSelect)};fluid.selectable.selectNext=function(target){target=$(target);focusNextElement(fluid.getScopedData(target,CONTEXT_KEY))};fluid.selectable.selectPrevious=function(target){target=$(target);focusPreviousElement(fluid.getScopedData(target,CONTEXT_KEY))};fluid.selectable.currentSelection=function(target){target=$(target);var that=fluid.getScopedData(target,CONTEXT_KEY);return $(that.selectedElement())};fluid.selectable.defaults={direction:fluid.a11y.orientation.VERTICAL,selectablesTabindex:-1,autoSelectFirstItem:true,rememberSelectionState:true,selectableSelector:".selectable",selectableElements:null,onSelect:null,onUnselect:null,onLeaveContainer:null};var checkForModifier=function(binding,evt){if(!binding.modifier){return true}var modifierKey=binding.modifier;var isCtrlKeyPresent=modifierKey&&evt.ctrlKey;var isAltKeyPresent=modifierKey&&evt.altKey;var isShiftKeyPresent=modifierKey&&evt.shiftKey;return isCtrlKeyPresent||isAltKeyPresent||isShiftKeyPresent};var makeActivationHandler=function(binding){return function(evt){var target=evt.target;if(!fluid.enabled(evt.target)){return }var code=evt.which?evt.which:evt.keyCode;if(code===binding.key&&binding.activateHandler&&checkForModifier(binding,evt)){var event=$.Event("fluid-activate");$(evt.target).trigger(event,[binding.activateHandler]);if(event.isDefaultPrevented()){evt.preventDefault()}}}};var makeElementsActivatable=function(elements,onActivateHandler,defaultKeys,options){var bindings=[];$(defaultKeys).each(function(index,key){bindings.push({modifier:null,key:key,activateHandler:onActivateHandler})});if(options&&options.additionalBindings){bindings=bindings.concat(options.additionalBindings)}fluid.initEnablement(elements);for(var i=0;i<bindings.length;++i){var binding=bindings[i];elements.keydown(makeActivationHandler(binding))}elements.bind("fluid-activate",function(evt,handler){handler=handler||onActivateHandler;return handler?handler(evt):null})};fluid.activatable=function(target,fn,options){target=$(target);makeElementsActivatable(target,fn,fluid.activatable.defaults.keys,options)};fluid.activate=function(target){$(target).trigger("fluid-activate")};fluid.activatable.defaults={keys:[$.ui.keyCode.ENTER,$.ui.keyCode.SPACE]}})(jQuery,fluid_1_4);