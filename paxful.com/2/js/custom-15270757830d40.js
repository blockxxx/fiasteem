var $affixElement=$('ul[data-spy="affix"]');if($affixElement.length){$(window).resize(function(){$affixElement.width($affixElement.parent().width());});$(window).scroll(function(){$affixElement.width($affixElement.parent().width());});}
$(document).ready(function()
{var trade_limits=$("#trade-limits");var trade_fiat_limit_min=parseFloat(trade_limits.data("fiat-limit-min"));var trade_fiat_limit_max=parseFloat(trade_limits.data("fiat-limit-max"));var offer_currency_rate_model=$("#offer-currency-rate");var offer_currency_rate=offer_currency_rate_model.data("price-per-btc");var market_price_rate=offer_currency_rate_model.data("market-price");var market_price_box=$(".market-price-box");var market_price_value=market_price_box.find('#market-price-value');var start_trade_form=$("#start-trade-form");var error_popover=$("#amount-fiat-container");var amount_btc=$("#amount_btc");var amount_fiat=$("#amount_fiat");var current_balance_btc=offer_currency_rate_model.data('current-balance-btc');var $currentBalanceBTCAmount=$('#currentBalanceBTCAmount');var $negativeBalanceNoticeBlock=$('#negativeBalanceNoticeBlock');var $newBalanceBTCAmount=$negativeBalanceNoticeBlock.find('#newBalanceBTCAmount');var fiatCurrencyName=offer_currency_rate_model.data('fiat-currency-name');var fiatCurrencyCode=offer_currency_rate_model.data('currency-code');$newBalanceBTCAmount.text(getFiatCurrencyAmount(current_balance_btc,false)+' ('+current_balance_btc+' BTC)');$currentBalanceBTCAmount.text(getFiatCurrencyAmount(current_balance_btc,false)+' ('+current_balance_btc+' BTC)');var escrow_amount_max=parseFloat($("#escrow_amount_available").val());var escrow_warning=$('#escrow_warning');$('.ladda-button').on('click',function(){var $this=$(this);var form=$this.closest('form')[0];if((typeof document.createElement('input').checkValidity=='function')&&!form.checkValidity()){setTimeout(function(){$this.removeAttr('disabled');$this.removeAttr('data-loading');},0);}});amount_btc.on("change paste keyup",function(e){calculateFiatAmount($(this).val());$negativeBalanceNoticeBlock.show();$newBalanceBTCAmount.text(getFiatCurrencyAmount((parseFloat(current_balance_btc)+parseFloat($(this).val()))),false);if(amount_fiat.val()>trade_fiat_limit_max||amount_fiat.val()<trade_fiat_limit_min||!$.isNumeric($(this).val())){start_trade_form.find("div.amount-container").addClass("has-error");error_popover.popover('show');$('#start-trade-btn').prop('disabled',true);}else{if(start_trade_form.find("div.amount-container").hasClass("has-error")){error_popover.popover('hide');start_trade_form.find("div.amount-container").removeClass("has-error");$('#start-trade-btn').prop('disabled',false);}}
if(start_trade_form.find("div.amount-container").hasClass("has-error")){market_price_box.fadeOut();$negativeBalanceNoticeBlock.hide();}else{market_price_box.fadeIn();calculateMarketPriceValue();escrowWarning();}});amount_fiat.on("change paste keyup",function(e){setFiatAmountColor();$negativeBalanceNoticeBlock.show();var newBalance=calculateBtcAmount($(this).val());newBalance=parseFloat(newBalance.toFixed(8));var newUserBalance=(current_balance_btc+newBalance);newUserBalance=parseFloat(newUserBalance.toFixed(8));$newBalanceBTCAmount.text(getFiatCurrencyAmount(newUserBalance)+' ('+newUserBalance+' BTC)');if($(this).val()>trade_fiat_limit_max||$(this).val()<trade_fiat_limit_min||!$.isNumeric($(this).val())){start_trade_form.find("div.amount-container").addClass("has-error");error_popover.popover('show');$('#start-trade-btn').prop('disabled',true);}else{if(start_trade_form.find("div.amount-container").hasClass("has-error")){error_popover.popover('hide');start_trade_form.find("div.amount-container").removeClass("has-error");$('#start-trade-btn').prop('disabled',false);}}
if(start_trade_form.find("div.amount-container").hasClass("has-error")){market_price_box.fadeOut();$negativeBalanceNoticeBlock.hide();}else{market_price_box.fadeIn();calculateMarketPriceValue();escrowWarning();}});function getFiatCurrencyAmount(amount,skipCurrency){var fiatAmount=(amount*market_price_rate).toFixed(2);if(!$.isNumeric(fiatAmount)){fiatAmount='0.00';}
if(true===skipCurrency){return fiatAmount;}
return fiatAmount+' '+currencyHelper.getPluralCurrencyName(fiatCurrencyCode,fiatAmount);}
function calculateFiatAmount(btcAmount){var newFiatAmount=currencyHelper.truncateDecimals((btcAmount*offer_currency_rate),2);amount_fiat.val(parseFloat(newFiatAmount));return newFiatAmount;}
function calculateBtcAmount(fiatAmount){var newBtcAmount=fiatAmount/offer_currency_rate;amount_btc.val(parseFloat(newBtcAmount.toFixed(8)));return newBtcAmount;}
function calculateMarketPriceValue(){market_price_value.text(currencyHelper.truncateDecimals((market_price_rate*amount_btc.val()),2));}
function escrowWarning(){if(parseFloat(amount_btc.val())>escrow_amount_max){escrow_warning.show();}else{escrow_warning.hide();}}
function setFiatAmountColor(){if(amount_fiat.prop("tagName").toLowerCase()=='select'){amount_fiat.css('color',amount_fiat.val()===''?'#aaa':'#555');}}
$(".more-link").click(function(e){e.preventDefault();if($(this).hasClass("less")){$(this).removeClass("less");$(this).html("Show more");}else{$(this).addClass("less");$(this).html("Show less");}
$(this).parent().prev().toggle();$(this).prev().toggle();});if(jQuery.fn.checkbox){var $transactions=$('#transactions');$('.checkbox.btc-usd-switch-container').checkbox({fireOnInit:false,onChecked:function(){$transactions.find('.transactions-heading-text-container .denomination').text('BTC');$transactions.find('.ledger-node-content .usd-denomination').hide();$transactions.find('.ledger-node-content .btc-denomination').fadeIn();},onUnchecked:function(){$transactions.find('.transactions-heading-text-container .denomination').text('USD');$transactions.find('.transactions-heading-text-container .fiat').text('Fiat');$transactions.find('.ledger-node-content .usd-denomination').fadeIn();$transactions.find('.ledger-node-content .btc-denomination').hide();}});}
var sendOfferInterestBtn=$("#send-offer-interest-btn");if(sendOfferInterestBtn.length){sendOfferInterestBtn.ladda();sendOfferInterestBtn.click(function(e){e.preventDefault();var action=confirm(Lang.get('js.custom.are_you_sure'));if(action==false){return false;}
sendOfferInterestBtn.ladda('start');$.ajax({type:"POST",url:"/offer-manager/notify-offer",data:{token:$('meta[name=_token]').attr("content"),offer_hash:$('#offer_hash').val(),amount_fiat:$('#amount_fiat').val(),amount_btc:$('#amount_btc').val()}}).done(function(data){if(data.status=='success'){window.location.href=data.redirect;}else{$('.offer-interest-text-container').html(data.message);sendOfferInterestBtn.ladda('stop');}}).fail(function(data){sendOfferInterestBtn.ladda('stop');});});}
$('.social-share').click(function(e)
{e.preventDefault();window.open($(this).attr('href'),'_blank','height=450, width=550, top='+($(window).height()/2-275)+', left='+($(window).width()/2-225)+', toolbar=0, location=0, menubar=0, directories=0, scrollbars=0');return false;});var $searchFormContainer=$('#search #browse-search-form');$searchFormContainer.on('submit',function(e){var that=$(this);var offerType=$('input[name="offerType"]:checked',that).val();var amount=$('input[name="amount_request"]').val()||Lang.get('js.custom.no_amount');var currency=$('select option[value="'+$('select[name="search_currency"] ').val()+'"] ').attr('data-code')||'['+Lang.get('js.custom.no_currency')+']';var paymentMethod=$('select[name="payment_method"]').val()||'['+Lang.get('js.custom.no_method')+']';ga('send','event','BUY/SELL search','search-'+offerType,'['+amount+']['+currency+']['+paymentMethod+']');ga('send','event','BUY/SELL search','search-currency',currency);ga('send','event','BUY/SELL search','search-method',paymentMethod);ga('send','event','Search '+offerType,'search-'+currency+'-'+paymentMethod,amount);ga('send','event','Search '+offerType,'search-currency',currency);ga('send','event','Search '+offerType,'search-method',paymentMethod);});$('#summary a.payment-method-group-link-wrapper[href*="buy-bitcoin?group=gift-cards#content"]').on('click',function(e){e.preventDefault;ga('send','event','Buy bitcoin summary','click-group','Gift Cards');});$('#summary a.payment-method-group-link-wrapper[href*="cash-deposits?group=gift-cards#content"]').on('click',function(e){e.preventDefault;ga('send','event','Buy bitcoin summary','click-group','Cash Deposits');});$('#summary a.payment-method-group-link-wrapper[href*="cash-deposits?group=online-transfers#content"]').on('click',function(e){e.preventDefault;ga('send','event','Buy bitcoin summary','click-group','Online Transfers');});$('#summary a.payment-method-group-link-wrapper[href*="cash-deposits?group=debitcredit-cards#content"]').on('click',function(e){e.preventDefault;ga('send','event','Buy bitcoin summary','click-group','DebitCredit cards');});$('#summary .column-links ul').on('click','li a',function(e){e.preventDefault;var groupName=$(this).parent().parent().parent().prev().attr('href').split('group=');groupName=groupName[1].split('#')[0];var linkName=$(this).attr('href').split('/');linkName=linkName[linkName.length-1];ga('send','event','Buy bitcoin summary','click-'+groupName,linkName);});$('#offers-list').on('click','table tr.clickable-row',function(e){e.preventDefault();var $tableRow=$(this);var $profileRating=$('td:first-child strong',$tableRow).html();var $youGet=$('td.price-per-btc strong',$tableRow).html();ga('send','event','Selected offer','click-offer','['+$profileRating+']['+$youGet+']');});var pageLoadedTime;if($('#start-trade-form').is(':visible')){pageLoadedTime=Date.now();}
start_trade_form.submit(function(){ga('send','event','trade','started',Math.round((Date.now()-pageLoadedTime)/1000));});});function send_two_factor_btn(two_factor_button,login_2fa_phone_code_field){two_factor_button.click(function(e){e.preventDefault();$('.send-sms-confirm-loading').removeClass('hide').show();$.ajax({type:"POST",url:"/auth/send-phone-code"}).done(function(data){if(data.status=='success'){two_factor_button.text(Lang.get('js.custom.send_new'));var span=two_factor_button.next('span');if(!span.length){span=$('<span>');two_factor_button.after(span);}
span.text(' - code sent');login_2fa_phone_code_field.attr("placeholder",Lang.get('js.custom.enter_confirmation_code'));}else if(data.status=='error'){if(data.code){switch(data.code){case 99997:toastr.error(Lang.get('js.custom.too_many_codes'));break;}}}
$('.send-sms-confirm-loading').hide();}).fail(function(data){two_factor_button.replaceWith(Lang.get('js.custom.error_code'));$('.send-sms-confirm-loading').hide();});});}
function call_two_factor_btn(two_factor_button,login_2fa_phone_code_field){two_factor_button.click(function(e){e.preventDefault();$('.send-sms-confirm-loading').removeClass('hide').show();$.ajax({type:"POST",url:"/auth/call-phone-code"}).done(function(data){if(data.status=='success'){two_factor_button.text(Lang.get('js.custom.call_again'));var span=two_factor_button.next('span');if(!span.length){span=$('<span>');two_factor_button.after(span);}
span.text(' - called');login_2fa_phone_code_field.attr("placeholder",Lang.get('js.custom.are_you_sure'));}else if(data.status=='error'){if(data.code){switch(data.code){case 21215:toastr.error(Lang.get('js.custom.country_not_supported'));break;case 99997:toastr.error(Lang.get('js.custom.too_many_codes'));break;}}}
$('.send-sms-confirm-loading').hide();}).fail(function(data){two_factor_button.replaceWith(Lang.get('js.custom.error_call'));$('.send-sms-confirm-loading').hide();});});}
call_two_factor_btn($("#api-confirm-call-btn"),$("#api-two-factor-field"));function currency_max_range(rate_usd,usd_max){if(rate_usd<=1){return usd_max;}else{return usd_max*Math.pow(10,((''+Math.floor(rate_usd)).length+1));}}
function toggleOfferState(checkbox,status){beforeToggleAllOffersState();$.ajax({type:"POST",url:"/offer-manager/toggle-offer-state",data:{token:$('meta[name=_token]').attr("content"),offer_hash:checkbox.data("offer-hash"),new_status:status}}).done(function(data){if(status){checkbox.parents("tr").removeClass("text-muted");}else{checkbox.parents("tr").addClass("text-muted");}
setAllOffersStateButtons();}).fail(function(jqXHR,textStatus){});}
function toggleAllOffersState(status){beforeToggleAllOffersState();$.ajax({type:"POST",url:"/offer-manager/toggle-all-offers-state",data:{token:$('meta[name=_token]').attr("content"),new_status:status}}).done(function(data){var action=status?'set checked':'set unchecked';var checkbox=$('.offers-table td.offer-active-toggle .checkbox');checkbox.checkbox(action);if(status){checkbox.parents("tr").removeClass("text-muted");}else{checkbox.parents("tr").addClass("text-muted");}
setAllOffersStateButtons();});}
function beforeToggleAllOffersState(){$('.turn-on-offers').hide();$('.turn-off-offers').hide();$('.turn-on-off-offers-spinner').show();}
function setAllOffersStateButtons(){var inactive=$('.offers-table').find('tr.text-muted').length;var active=$('.offers-table .offer-active-toggle').find('input:checked').length;if(inactive){$('.turn-on-offers').show();}else{$('.turn-on-offers').hide();}
if(active){$('.turn-off-offers').show();}else{$('.turn-off-offers').hide();}
$('.turn-on-off-offers-spinner').hide();}
var initCaptcha=function(container){"use strict";var init=function(captcha){$(captcha).data("widget-id",grecaptcha.render(captcha,{sitekey:captcha.attributes["data-sitekey"].value}));};if(container){init(container);}else{var captchas=document.getElementsByClassName("recaptcha");if(captchas.length>0){for(var i=0;i<captchas.length;i++){init(captchas[i]);}}}};function selectText(textField){textField.focus();textField.select();}
function getTourElement(tour){return tour._options.steps[tour._current].element}
function setFiatMarketPrice(elem,btcAmount,marketPrice){elem.text((btcAmount*marketPrice).toFixed(2));}
var currencyHelper=currencyHelper||{};(function($){"use strict";currencyHelper={marketPrice:0,baseCurrency:'BTC',init:function(marketPrice){this.marketPrice=marketPrice;},updateAmount:function(selectedCurrency,amount){var cryptoAmount,fiatAmount=0;if(selectedCurrency===this.baseCurrency){fiatAmount=parseFloat(this.marketPrice*amount).toFixed(2);cryptoAmount=amount;}else{cryptoAmount=parseFloat(amount/this.marketPrice).toFixed(8);fiatAmount=amount;}
return{fiatAmount:fiatAmount,cryptoAmount:cryptoAmount};},removeTrailingZeros:function(value){value=value.toString();if(value.indexOf('.')===-1){return value;}
while((value.slice(-1)==='0'||value.slice(-1)==='.')&&value.indexOf('.')!==-1){value=value.substr(0,value.length-1);}
return value;},getPluralCurrencyName:function(currencyCode,amount){var number=parseFloat(Math.abs(amount));if(number>1||number===0||(number<1&&number>0))
{number=2;}
else
{number=1;}
return Lang.choice('js.models.currencies.'+String(currencyCode).toLowerCase(),number);},truncateDecimals:function(num,digits){var finalResult=num.toFixed(digits);return parseFloat(finalResult);}};})(window.jQuery);