function BodyPartHelper() {
  this.mapSelector = 'map';
  this.chooseSelector = '[class="bodypartchosen"]';
  this.hoverSelector = '[class="bodyparthover"]';
  this.textSelector = '[id="bodyparttext"]';
  this.popupSelector = '[id="bodypopup"]'
  this.targetInputSelector = 'input[id="visit_localisation"]';
  this.targetDisplaySelector = 'span[id="displaybodypart"]'
  this.imageBodyContainerSelector = '[id^="imagebodysection"]'
  this.imageBodySectionSelector = '[name^="body-section"]'
  this.imageBodyPartSelectSelector = '[name^="bodypart-selected"]'
  this.imageBodyContainerBase = 'imagebodysection'
  this.imageBodySectionBase = 'body-section'
  this.imageBodyPartSelectBase = 'bodypart-selected'
  this.chosen = "";
  this.previousHover = "";
  this.imgUri = baseUrl + '/assets/img/body';
  this.imgExtension = "png"
  this.sections = "null|front|back|leftleg|rightleg|feetabove|feetbelow".split("|");
  //this.parts = "null|dig I RV|dig II RV|dig III RV|dig IV RV|dig V RV|dig I LV|dig II LV|dig III LV|dig IV LV|dig V LV|MTP Dorsum LV|MTP Dorsum RV|Middenvoet Dorsum LV|Middenvoet Dorsum RV|Hiel RV|Hiel LV|MTP Plantair RV|MTP Plantair LV|laterale onderbeen Links|laterale onderbeen rechts |mediale onderbeen rechts|mediale onderbeen links|onderbeen (geheel) links|onderbeen (geheel) rechts|laterale bovenbeen links|laterale bovenbeen rechts|mediale bovenbeen links|mediale bovenbeen rechts|bovenbeen (geheel) links |bovenbeen (geheel) rechts|heupregio / trochanter maj. Links|heupregio / trochanter maj. Rechts |abdomen|thorax voor|hals / cervicaal|hoofd frontaal|tuber ischiadicum links|tuber ischiadicum rechts|sacrum|flank / iliaca bdzs.|wervelkolom|scapula|bovenarm bdzs.|hoofd occipitaal|dorsale hand bdzs.|palmaire hand bdzs. |olecranon bdzs.|laterale malleolus links|mediale malleolus links |laterale malleolus rechts|mediale malleolus rechts|voet gewelf links|voet gewelf rechts".split("|");
  this.parts =   "null|dig I LV|dig II LV|dig III LV|dig IV LV|dig V LV|dig I RV|dig II RV|dig III RV|dig IV RV|dig V RV|MTP Dorsum LV|MTP Dorsum RV|Middenvoet Dorsum LV|Middenvoet Dorsum RV|Hiel LV|Hiel RV|MTP Plantair LV|MTP Plantair RV|laterale onderbeen Links|laterale onderbeen rechts |mediale onderbeen rechts|mediale onderbeen links|onderbeen (geheel) links|onderbeen (geheel) rechts|laterale bovenbeen links|laterale bovenbeen rechts|mediale bovenbeen links|mediale bovenbeen rechts|bovenbeen (geheel) links |bovenbeen (geheel) rechts|heupregio / trochanter maj. Links|heupregio / trochanter maj. Rechts |abdomen|thorax voor|hals / cervicaal|hoofd frontaal|tuber ischiadicum links|tuber ischiadicum rechts|sacrum|flank / iliaca bdzs.|wervelkolom|scapula|bovenarm bdzs.|hoofd occipitaal|dorsale hand bdzs.|palmaire hand bdzs. |olecranon bdzs.|laterale malleolus links|mediale malleolus links |laterale malleolus rechts|mediale malleolus rechts|voet gewelf links|voet gewelf rechts".split("|");
  this.partLookup = "null|6-1|6-2|6-3|6-4|6-5|6-6|6-7|6-8|6-9|6-10|5-11|5-12|5-13|5-14|6-15|6-16|6-17|6-18|1-19|1-20|1-21|1-22|3-23|4-24|1-25|1-26|1-27|1-28|3-29|4-30|3-31|4-32|1-33|1-34|1-35|1-36|2-37|2-38|2-39|2-40|2-41|2-42|1-43|2-44|2-45|1-46|2-47|1-48|2-49|1-50|1-51|6-52|6-53".split("|");
  
  this.doPopup = function() {
    this.clearAll();
	$(this.popupSelector).modal('show');
    /*$(this.popupSelector).dialog({
      modal: true, 
      width: '1500px',
      closeOnEscape: true
    });*/
    this.showPreSelected();
  };
  
  this.down = function (event) {
    var target;
    var e;
    if (!event) {
      e = window.event;
      target = e.srcElement;
    } else {
      e = event;
      target = event.target;
    }
    this.clearAllChosen();
    this.chosen = target;
    var parts = this.parseTarget(target);
    this.showChosen(parts[0], target);
    this.showText(parts[1]);
    this.setTargets(parts[1]);
    this.displayImageBodySection();
	
	$(this.popupSelector).modal('hide');
  };
  
  this.hover = function(event) {
    var target;
    var e;
    if (!event) {
      e = window.event;
      target = e.srcElement;
    } else {
      e = event;
      target = event.target;
    }
    this.clearAllHover();
    var parts = this.parseTarget(target);
    this.showHover(parts[0], target);
    this.showText(parts[1]);
    this.previousHover = target;
  };
  
  this.out = function(event) {
    this.clearAllHover();
  };
  
  this.clearAllChosen = function () {
    $(this.chooseSelector).each(function(i){
      this.style.display = 'none';
    });
  };

  this.clearAllHover = function () {
    $(this.hoverSelector).each(function(i){
      this.style.display = 'none';
    });
  };
  
  this.clearAll = function() {
    this.clearAllChosen();
    this.clearAllHover();
    this.hideText();
  };

  this.showChosen = function(sectionIndex, target) {
    if(sectionIndex) {
      var imgsrc = this.imgUri + '/' + target + '.' + this.imgExtension;
      $('#choose-' + this.sections[sectionIndex] ).each(function(i){
        this.src = imgsrc;
        this.style.display = 'inline';
      });
    }
  };
  
  this.showPreSelected = function() {
    // show that an already selected body part is chosen,
    // doing a reverse lookup
    var selected;
    $(this.targetInputSelector).each(function(i){
      selected = this.value;
    });
    if(selected && (selected.length > 0)) {
      var i = this.parts.indexOf(selected);
      if (i && (i>0)) {
        this.chosen = this.partLookup[i];
        var parts = this.parseTarget(this.chosen);
        this.showChosen(parts[0], this.chosen);
      }
    }
  };
  
  this.displayImageBodySection = function(selected) {
    if(!selected || selected.length == 0) {
      $(this.targetDisplaySelector).each(function(i){
        selected = $(this).text();
      });
    }
    if(selected && (selected.length > 0)) {
      var i = this.parts.indexOf(selected);
      if (i && (i>0)) {
        chosen = this.partLookup[i];
        var parts = this.parseTarget(chosen);
        sectionImg = this.imgUri + "/" + parts[0] + "-" + this.sections[parts[0]] + "." + this.imgExtension;
        $(this.imageBodySectionSelector).each(function(i){
          this.src = sectionImg;
          $(this).removeClass();
          $(this).addClass("bodysection");
          this.style.display = 'inline';
          this.style.visibility = 'visible';
        });
        selectedImg = this.imgUri + "/" + chosen + "." + this.imgExtension;
        $(this.imageBodyPartSelectSelector).each(function(i) {
          this.src = selectedImg;
          $(this).removeClass();
          $(this).addClass("bodypartselected");
          this.style.display = 'inline';
          this.style.visibility = 'visible';
        });
        $(this.imageBodyContainerSelector).each(function(i){
          this.style.display = 'inline';
          this.style.visibility = 'visible';
        });
      } else {
        $(this.imageBodyContainerSelector).each(function(i){
          this.style.display = 'none';
          this.style.visibility = 'hidden';
        });
        $(this.imageBodySectionSelector).each(function(i){
          this.style.display = 'none';
          this.style.visibility = 'hidden';
        });
        $(this.imageBodyPartSelectSelector).each(function(i){
          this.style.display = 'none';
          this.style.visibility = 'hidden';
        });
      }
    }
  };
  
  this.displayIndexedImageBodySection = function(selected, appendix) {
    if(selected && (selected.length > 0)) {
      var i = this.parts.indexOf(selected);
      if (i && (i>0)) {
        var chosen = this.partLookup[i];
        var parts = this.parseTarget(chosen);
        var sectionSelector='[name="'+ this.imageBodySectionBase + appendix + '"]';
        var partSelectSelector='[name="' + this.imageBodyPartSelectBase + appendix + '"]';
        var containerSelector='[id="' + this.imageBodyContainerBase + appendix + '"]';
        var sectionImg = this.imgUri + "/" + parts[0] + "-" + this.sections[parts[0]] + "." + this.imgExtension;
        $(sectionSelector).each(function(i){
          this.src = sectionImg;
          $(this).removeClass();
          $(this).addClass("bodysection");
          this.style.display = 'inline';
          this.style.visibility = 'visible';
        });
        var selectedImg = this.imgUri + "/" + chosen + "." + this.imgExtension;
        $(partSelectSelector).each(function(i) {
          this.src = selectedImg;
          $(this).removeClass();
          $(this).addClass("bodypartselected");
          this.style.display = 'inline';
          this.style.visibility = 'visible';
        });
        $(containerSelector).each(function(i){
          this.style.display = 'inline';
          this.style.visibility = 'visible';
        });
      } else {
        $(containerSelector).each(function(i){
          this.style.display = 'none';
          this.style.visibility = 'hidden';
        });
        $(sectionSelector).each(function(i){
          this.style.display = 'none';
          this.style.visibility = 'hidden';
        });
        $(partSelectSelector).each(function(i){
          this.style.display = 'none';
          this.style.visibility = 'hidden';
        });
      }
    }
  };

  this.hideChosen = function(sectionIndex) {
    if(sectionIndex) {
      $('#choose-' + this.sections[sectionIndex] ).each(function(i){
        this.style.display = 'none';
      });
    }
  };
  
  this.hideText = function() {
    $(this.textSelector).each(function(i){
      this.style.display = 'none';
    });
  };
  
  this.showText = function(partIndex) {
    var txt = this.parts[partIndex];
    $(this.textSelector).each(function(i){
      $(this).children().text(txt);
      this.style.display = 'inline';
    });
  };
  
  this.checkChosen = function() {
    if(this.chosen && this.chosen.length > 0) {
      var parts = this.parseTarget(this.chosen);
      return parts[0];
    }
    return -1;
  };
  
  this.showHover = function(sectionIndex, target) {
    this.clearAllHover();
    if(sectionIndex) {
      var imgsrc = this.imgUri + '/' + target + '.' + this.imgExtension;
      $('#hover-' + this.sections[sectionIndex] ).each(function(i){
        this.src = imgsrc;
        this.style.display = 'inline';
      });
    }
  };
  
  this.parseTarget = function(target) {
    var arr = target.split('-');
    for(var i = 0; i < arr.length; i++) {
      arr[i] = parseInt(arr[i]);
    }
    return arr;
  }
  
  this.getTargetFromHref = function(href) {
    var arr = href.split('#');
    return arr[1];
  };
  
  this.setTargets = function(partIndex) {
    var value = this.parts[partIndex];
    $(this.targetDisplaySelector).each(function(i){
      $(this).text(value);
      this.style.display = 'inline';
    });
    $(this.targetInputSelector).each(function(i){
      this.value = value;
      this.style.display = 'inline';
    });

  };

}

var g_helper = new BodyPartHelper();



