$(document).ready(function () {
	
	$(".showSelectedPdfFile").change(function(){
		if (this.files && this.files[0]) {
			$(this).parent().next().html(this.files[0].name);
		}
	});
	
	//delete transfer pdf via ajax
	$( "a[id^='remove-transfer-pdf-link-']" ).click(function(event) {
        event.preventDefault();
		
		var linkElement = $(this);
		var linkId 		= linkElement.attr('id');
		var aSplit 		= linkId.split("-");
		var transferId 	= aSplit[4];
		//var transferId 	= aSplit[4];
		var r = confirm("Weet je zeker dat je deze overdracht wilt verwijderen ?");
		
		if (r) {
			$.ajax({
				type: "POST",
				url: baseUrl + "/beheer/msvt/delete-transfer-pdf",
				data: { transfer_id: transferId },
				success: function(response) {
					if(response.success){
						var isFrom 		= linkElement.attr('data-from');
						var MsvtId 		= linkElement.attr('data-msvt-id');
						
						if('list' == isFrom)
							url = baseUrl + "/beheer/msvt/get-transfers/" + MsvtId;
						else
							url = baseUrl + "/beheer/msvt/update/" + MsvtId;
						
						alert(response.transfer);
						//window.location.reload(true);
						window.location.replace(url);
					}else{
						alert(response.transfer);
					}
				},
				error: function(data){
					//error
					console.log("Error ", data);
				}
			});
		}
    });
	
	$( "a[data-click=panel-collapse]" ).click(function(event) {
        event.preventDefault();
		var plusIcons = $(this).find('i.fa-plus-circle');
		var minusIcons = $(this).find('i.fa-minus-circle');
		if(plusIcons.length !== 0){
			plusIcons.removeClass('fa-plus-circle');
			plusIcons.addClass('fa-minus-circle');
		}
		
		if(minusIcons.length !== 0){
			minusIcons.removeClass('fa-minus-circle');
			minusIcons.addClass('fa-plus-circle');
		}
    });
	
	$( "button[name='list-allowed-actions-link']" ).click(function(event) {
        event.preventDefault();
		
		var element = $(this);
		var link 	= element.attr('data-href');
		$.ajax({
			type: "POST",
			url: link,
			success: function(response) {
				var elementExists = element.parent().find( "ul" );
				
				if(elementExists.length == 0)
					$( response ).insertAfter( element );
			},
			error: function(data){
				//error
				console.log("Error ", data);
			}
		});
    });
	
	$("#extra_departure_to_patient_date").change(function(){
		var selecteddate = $(this).val(); 
		
		$("#extra_arriving_at_patient_date").val(selecteddate);
		$("#extra_departure_from_patient_date").val(selecteddate);
		$("#extra_arriving_at_home_date").val(selecteddate);
		
	});
	
	//delete comment via ajax
	$( "a[id^='delete-comment-link-']" ).click(function(event) {
        event.preventDefault();
		
		var linkId 		= $(this).attr('id');
		var aSplit 		= linkId.split("-");
		var commentId 	= aSplit[3];
		
		var r = confirm("Weet je zeker dat je deze opmerking wilt verwijderen ?");
		
		if (r == true) {
			$.ajax({
				type: "POST",
				url: baseUrl + "/beheer/comment/delete-comment-ajax",
				data: { comment_id: commentId },
				success: function(response) {
					if(response.success){
						alert(response.comment);
						window.location.reload(true);
					}else{
						alert(response.comment);
					}
				},
				error: function(data){
					//error
					console.log("Error ", data);
				}
			});
		}
    });
	
	
	$('select[name=doctor_organization_id]').change(function() {

		if( $('select[name^=doctor_departments]').length )
		{
			$('select[name^=doctor_departments]').empty();
			
			if( $('#department_responsible_id').length )
			{
				$('#department_responsible_id').empty();
			}
			if( $('#msvt_responsible_id').length )
			{
				$('#msvt_responsible_id').empty();
			}
		}
		
		if($(this).val() != ""){
			var data = new Object();
			data['organization_id'] 	= $(this).val();
			var post = { data: JSON.stringify(data)};
					
			$.ajax({
				type: "POST",
				url: baseUrl + "/beheer/hospital/get-departments-by-organization",
				data: post,
				success: function(response) {
					if(response.success){
						var departments = response.departments;
						var optionsAsString = "";
						$.each( departments, function( key, value ) {
						  optionsAsString += "<option value='" + key + "'>" + value + "</option>";
						});
						
						$('select[id=doctor_departments]').html( optionsAsString );
					}
					
				},
				error: function(data){
					//error
					console.log("Error ", data);
				}
			});
		}
	});
	//delete consultation via ajax
	$( "a[id^='delete-consultation-link-']" ).click(function(event) {
        event.preventDefault();
		
		var linkId 			= $(this).attr('id');
		var aSplit 			= linkId.split("-");
		var consultationId 	= aSplit[3];
		
		var r = confirm("Weet je zeker dat je deze ongepland consult wilt verwijderen?");
		
		if (r == true) {
			$.ajax({
				type: "POST",
				url: baseUrl + "/beheer/msvt/delete-consultation-ajax",
				data: { consultation_id: consultationId },
				success: function(response) {
					if(response.success){
						alert(response.consultation);
						window.location.reload(true);
					}else{
						alert(response.consultation);
					}
				},
				error: function(data){
					//error
					console.log("Error ", data);
				}
			});
		}
    });
	
	//delete transfer via ajax
	$( "a[id^='delete-transfer-link-']" ).click(function(event) {
        event.preventDefault();
		
		var linkId 		= $(this).attr('id');
		var aSplit 		= linkId.split("-");
		var transferId 	= aSplit[3];
		
		var r = confirm("Weet je zeker dat je deze overdracht wilt verwijderen?");
		
		if (r == true) {
			$.ajax({
				type: "POST",
				url: baseUrl + "/beheer/msvt/delete-transfer-ajax",
				data: { transfer_id: transferId },
				success: function(response) {
					if(response.success){
						alert(response.transfer);
						window.location.reload(true);
					}else{
						alert(response.transfer);
					}
				},
				error: function(data){
					//error
					console.log("Error ", data);
				}
			});
		}
    });
	
	$('a[name=seeMoreDataLink]').click(function(event){
		var linkId 	= $(this).attr('id');
		var result 	= linkId.split("_");
		var tableId = "table_wound_" + result[1];
		
		if('Meer' == jQuery.trim($(this).text())){
			$(this).html('<i class="fa fa-lg  fa-minus"></i> <em>Minder</em>');
			$("#"+tableId+" tbody tr.more").show();
		} else{
			$(this).html('<i class="fa fa-lg fa-plus"></i> <em>Meer</em>');
			$("#"+tableId+" tbody tr.more").hide();
		}
	});
	$('select[name=msvt_wound_count]').change(function() {
		if($(this).val() != ""){
			if($(this).val() == '1'){
				$('#div_med_indication_1').show();
				$('#div_med_indication_2').hide();
				$('#div_med_indication_3').hide();
				$('#div_med_indication_4').hide();
				$('#div_med_indication_5').hide();
			}else if($(this).val() == '2'){
				$('#div_med_indication_1').show();
				$('#div_med_indication_2').show();
				$('#div_med_indication_3').hide();
				$('#div_med_indication_4').hide();
				$('#div_med_indication_5').hide();
			}else if($(this).val() == '3'){
				$('#div_med_indication_1').show();
				$('#div_med_indication_2').show();
				$('#div_med_indication_3').show();
				$('#div_med_indication_4').hide();
				$('#div_med_indication_5').hide();	
			}else if($(this).val() == '4'){
				$('#div_med_indication_1').show();
				$('#div_med_indication_2').show();
				$('#div_med_indication_3').show();
				$('#div_med_indication_4').show();
				$('#div_med_indication_5').hide();
			}else if($(this).val() == '5'){
				$('#div_med_indication_1').show();
				$('#div_med_indication_2').show();
				$('#div_med_indication_3').show();
				$('#div_med_indication_4').show();
				$('#div_med_indication_5').show();	
			}
		}
	});

	$('#patientQuickSearchForm').submit(function(e) {
		$('#patientQuickSearchInput').removeClass('parsley-error');
		
		var val   = $('#patientQuickSearchInput').val();
		var regex = /^\d+$/;
		
		var sMsg = '';
		if($.trim(val) == ""){
			sMsg = 'U moet de geboortedatum of klantnummer invoeren.';
		}else if(!regex.test(val)){
			sMsg = 'De geboortedatum of klantnummer is niet correct.';
		}
		
		if(sMsg){
			e.preventDefault();
			$('#patientQuickSearchInput').addClass('parsley-error');
			alert(sMsg);
		}
	});
	
	$('select#doctor_departments').change(function() {
		if( $('select#department_responsible_id').length && $('select#msvt_responsible_id').length)
		{
			optionsAsString = "";
			if( $(this).val() != null){
				$('#doctor_departments :selected').each(function(i, selected){ 
					  optionsAsString += "<option value='" + $(selected).val() + "'>" + $(selected).text() + "</option>";
				});
			}
			$('select#department_responsible_id').html( optionsAsString );
			$('select#msvt_responsible_id').html( optionsAsString );
		}
		
	});
	
	
	$("#advancedSearchLink").click(function(event){
		if('Eenvoudig zoeken' == jQuery.trim($(this).text())){
			$(this).html('<i class="fa fa-lg fa-plus"></i> <em>Uitgebreid zoeken</em>');
			$("#searchFormHiddenDiv").hide();
		} else{
			$(this).html('<i class="fa fa-lg fa-minus"></i> <em>Eenvoudig zoeken</em>');
			$("#searchFormHiddenDiv").show();
		}
		
	});
	
	$(".showSelectedFile").change(function(){
		if (this.files && this.files[0]) {
			var reader = new FileReader();
			var divId = this.id+'_img';
			
			var cssClass = "percent50";
			if (this.id.indexOf("edema_") >= 0){
				cssClass = "percent100";
			}
			reader.onload = function (e) {
				//$('#'+divId).attr('src', e.target.result);
				$('#'+divId).empty();
				$('#'+divId).prepend('<img alt="" src="'+e.target.result+'" class="img-rounded '+cssClass+'" />');
			}
			reader.readAsDataURL(this.files[0]);
		}
	});

	$('select[id=collaboration_from_dept_id]').change(function() {
		$('select[id=collaboration_to_dept_id]').html('');
		$('#collaboration_to_dept_id_div').show();
		
		if($(this).val() != ""){
			var data = new Object();
			data['department_id'] 	= $(this).val();
			var post = { data: JSON.stringify(data)};
					
			$.ajax({
				type: "POST",
				url: baseUrl + "/beheer/department/get-departments-to-collaborate-with",
				data: post,
				success: function(response) {
					if(response.success){
						var departments = response.departments;
						var optionsAsString = "";
						$.each( departments, function( key, value ) {
						  optionsAsString += "<option value='" + key + "'>" + value + "</option>";
						});
						
						$('select[id=collaboration_to_dept_id]').html( optionsAsString );
					}

					
				},
				error: function(data){
					//error
					console.log("Error ", data);
				}
			});
		}
	});
	
	editOrderAddress();
	
	$("#btn-save-order-address").click(function(event) {
		event.preventDefault();
		
		var address_id 			 = $.trim($("input[name='address_id']").val());
		var address_post_code 	 = $.trim($("input[name='address_post_code']").val());
		var address_street 		 = $.trim($("input[name='address_street']").val());
		var address_house_number = $.trim($("input[name='address_house_number']").val());
		var address_city 		 = $.trim($("input[name='address_city']").val());
		var addition_number		 = $.trim($("input[name='address_house_addition_number']").val());
		var entityId			 = $.trim($("input[name='address_entity_id']").val());
		
		if(address_id == '' || address_post_code == '' || address_street == '' || address_house_number == '' || address_city == '' || entityId == ''){
			$( "#cendrisCheckAdresMsg" ).addClass('alert alert-danger');
			$( "#cendrisCheckAdresMsg" ).text("Waarde is vereist en kan niet leeg zijn.");
		}else{
		
			var data 					 			= new Object();
			data['address_id'] 			 			= address_id;
			data['address_post_code'] 	 			= address_post_code;
			data['address_street'] 		 			= address_street;
			data['address_house_number'] 			= address_house_number;
			data['address_city'] 		 			= address_city;
			data['address_house_addition_number'] 	= addition_number;
			data['address_entity_id'] 				= entityId;
			
			$.ajax({
				type: "POST",
				url: baseUrl + "/beheer/address/save-order-address",
				data: data,
				success: function(response) {
					if(response.error || response.error == "true"){
						$( "#cendrisCheckAdresMsg" ).addClass('alert alert-danger');
						$( "#cendrisCheckAdresMsg" ).text(response.result);
					}else if(!response.error || response.error == "false"){
						var sAddress = address_street + ' ' + address_house_number + ' ' + addition_number + ', ' + address_post_code.toUpperCase() + ', ' + address_city;

						if('Hoofdadres' == response.address_type){
							$( "#patient_delivery_address_0" ).text(sAddress);
						}else if('Bezorgadres' == response.address_type){
							
							if( $('#btn-add-order-address').length ){

								var radioButton = '<input name="patient_delivery_address" checked="checked" value="Bezorgadres" type="radio"> '+
								'<span id="patient_delivery_address_1">'+ sAddress +'( Bezorgadres )</span> ' +
								'<a href="#" name="order-address-link" data-entity-address-id="'+entityId+'" data-address-id="'+response.address_id+'" data-toggle="modal"><i class="fa fa-lg fa-pencil"></i></a>';
								
								$('#btn-add-order-address').replaceWith(radioButton);
								
								editOrderAddress();

							}else{
								$( "#patient_delivery_address_1" ).text(sAddress);
							}
							
						}
						
						alert(response.result);
						$( "#order-address-modal" ).modal('hide');
					}
				},
				error: function(data){
					//error
					console.log("Error ", data);
				}
			});
		}
	});
	
	
	$("#btnSavePlanningComment").click(function(event) {
		event.preventDefault();
		var comment = $("#planningEventComment").val();

		var data = new Object();
		data['comment'] = $("#planningEventComment").val();
		data['eventId'] = $("#planningEventId").val();
		
		$.ajax({
			type: "POST",
			url: baseUrl + "/beheer/planning/save-event-comment",
			data: data,
			success: function(response) {
				if(response.success){
					$( "#showEventComment" ).modal('hide');
					alert("De Commentaargegevens zijn met succes opgeslagen.");
				}else{
					alert(response.message);
				}
			},
			error: function(data){
				//error
				console.log("Error ", data);
			}
		});
	});
	
	$("input#doctor_lastname").autocomplete({
		source: baseUrl + "/beheer/doctor/doctor-autocomplete",
		select: function( event, ui ) {

			var doctor_id = ui.item.doctor_id;

			$.ajax({
				type: "POST",
				url: baseUrl + "/beheer/doctor/get-homedoctor-by-id",
				data: { doctor_id: doctor_id },
				success: function(response) {
					if(response.success){
						var doctor = response.doctor;
						$("input[name='Person[person_initials]']").val(doctor.doctor_initials);
						$("input[name='Person[person_prefix]']").val(doctor.doctor_prefix);
						$("input[name='Person[person_lastname]']").val(doctor.doctor_lastname);
						$("input[name='Person[person_phone]']").val(doctor.doctor_phone);
						$("input[name='Doctor[doctor_agbcode]']").val(('00000000' + doctor.doctor_agbcode).slice(-8));
					}else{
						alert(response.message);
					}

					
				},
				error: function(data){
					//error
					console.log("Error ", data);
				}
			});
		}
	});
		
	$("#cendrisCheckAdresLink").click(function(event){

		//$( "#address_house_addition_number" ).val('');
		$( "#address_street" ).val('');
		$( "#address_city" ).val('');
					
		EmptyCendrisCheckAdresMs();
		
		var data = new Object();
		
		var postcode    = $( "#address_post_code" ).val();
		var housenumber = $( "#address_house_number" ).val();
		
		data['postcode'] 	= postcode;
		data['housenumber'] = housenumber;
		
		var post = { data: JSON.stringify(data)};
				
		$.ajax({
			type: "POST",
			url: baseUrl + "/beheer/address/cendris-check-adres",
			data: post,
			success: function(response) {
				if(response.error || response.error == "true"){
					$( "#cendrisCheckAdresMsg" ).addClass('alert alert-danger');
					$( "#cendrisCheckAdresMsg" ).text(response.result);
				}else if(!response.error || response.error == "false"){
					var oResult = response.result;
					
					//$( "#address_house_addition_number" ).val(oResult.huisnummertoevoeging);
					$( "#address_street" ).val(oResult.straatnaam);
					$( "#address_city" ).val(oResult.woonplaats);
					
				}
			},
			error: function(data){
				//error
				console.log("Error ", data);
			}
		});
	});
	
	/**
	 * save copied events 
	 */
	$("#link_copy_events").click(function(event) {
		event.preventDefault();
		
		var currentDate = $('#patient-calendar').fullCalendar('getDate');
		//var currentDate = new Date();
		
		var currentWeek = startAndEndOfWeek(currentDate);
		
		var minDate = new Date(currentWeek[1].getFullYear(), currentWeek[1].getMonth(), currentWeek[1].getDate()+1);
		
		/*$('#fromDate').datepicker('setStartDate', minDate);
		$('#toDate').datepicker('setStartDate', minDate);*/
		$('#copy-planning-datepicker-container .input-group.date').datepicker({
			weekStart: 1,
			format: 'dd-mm-yyyy',
			autoclose: true,
			language: "nl",
			startDate : minDate
		});
		
		$( "#copy-events-modal" ).modal('show');
	});
	
	$("#btnCopy").click(function(event) {
		event.preventDefault();
		$( "#copyEventsMessage" ).remove();
		

		var fromDate = $('#fromDate').val();
		var toDate = $('#toDate').val();
		
		if(fromDate == "" || toDate == ""){
			$( "#copyEventsModalBody" ).append( '<div id="copyEventsMessage" class="alert alert-danger fade in m-b-15">Alle velden zijn verplicht.</div>' );
		}else{
			if($.datepicker.parseDate("dd-mm-yy", toDate) <= $.datepicker.parseDate("dd-mm-yy", fromDate)){
				$( "#copyEventsModalBody" ).append( '<div id="copyEventsMessage" class="alert alert-danger fade in m-b-15">De einddatum moet lager die startdatum.</div>' );
			}else{
				var currentDate = $('#patient-calendar').fullCalendar('getDate');

				var currentWeek = startAndEndOfWeek(currentDate);
			
				var data = new Object();
				
				data['fromDate'] = fromDate;
				data['toDate'] 	 = toDate
				data['idNurse']  = $('select[name=nursesList]').val();
				
				data['startOfWeek'] = currentWeek[0];
				data['endOfWeek'] 	= currentWeek[1];
				var post = { data: JSON.stringify(data)};
				
				$.ajax({
					type: "POST",
					url: baseUrl + "/beheer/planning/copy-events",
					data: post,
					success: function(response) {

						if(response.last_id == "requiredFields"){
							$( "#copyEventsModalBody" ).append( '<div id="copyEventsMessage" class="alert alert-danger fade in m-b-15">Alle velden zijn verplicht</div>' );
						}else if(response.last_id == "InvalidDates"){
							$( "#copyEventsModalBody" ).append( '<div id="copyEventsMessage" class="alert alert-danger fade in m-b-15">Ongeldige datum.</div>' );
						}else if(response.last_id == "arrayIsEmpty"){
							$( "#copyEventsModalBody" ).append( '<div id="copyEventsMessage" class="alert alert-danger fade in m-b-15">Er zijn geen agendapunten op deze week.</div>' );
						}else{
							if(response.last_id){
								$('#patient-calendar').fullCalendar('refetchEvents');
								alert("De gebeurtenissen zijn met succes gekopieerd.");
								getEventsByNurse($('select[name=nursesList]').val());
								$( "#copy-events-modal" ).modal('hide');
							}else{
								$( "#copyEventsModalBody" ).append( '<div id="copyEventsMessage" class="alert alert-danger fade in m-b-15">Mislukt.</div>' );
							}
						}
					},
					error: function(data){
						//error
						console.log("Error ", data);
					}
				});
			}
		}
	});
	
	/****************** end form copy events *****************************************/
	
	//$('.isDatepicker')
	$('#unavailability-datepicker .input-group.date').datepicker({
		weekStart: 1,
		todayHighlight: true,
		format: 'dd-mm-yyyy',
		autoclose: true,
		language: "nl",
		changeMonth: true,
		changeYear: true,
		endDate: '+4m'
	}).on('changeDate', function(e) {
		
		$('#betweenDatesEventsDiv').hide();
		$('#betweenDatesEventsDiv').empty();
		
		var msvt_id 	= $('input[name="unavailability_msvt_id"]').val();
		var startDate 	= $('#unavailability_startdate').val();
		var endDate   	= $('#unavailability_enddate').val();
		
		if(msvt_id != '' && startDate != ''){
			var today = new Date();
			var month = today.getMonth() + 1;
			
			var strToday = today.getDate() + '-' + month + '-' + today.getFullYear();
			
			var data 			= new Object();
			data['msvt_id'] 	= msvt_id;
			data['startDate'] 	= startDate;
			data['endDate'] 	= endDate;
			var post 			= { data: JSON.stringify(data)};
			
			$.ajax({
				type: "POST",
				url: baseUrl + "/beheer/msvt/get-future-events-between-dates",
				data: post,
				success: function(response) {
					if(response.success){
						var events = response.events;

						if(events != 'empty'){
							var paragraph = $('<p>De onderstaande planningen van deze pati&euml;nt zullen verwijderd worden.</p>');
							$('#betweenDatesEventsDiv').append( paragraph );
							$.each( events, function( key, value ) {
								var url = baseUrl + "/beheer/planning?desiredDay=" + key + "&nursesList=" + value;
								var link = $('- <a target="_blank" href="' + url + '"> ' + key + '</a><br>');
								$('#betweenDatesEventsDiv').append( link );
							});
							$('#betweenDatesEventsDiv').show();
						}
						
					}else{
						alert("Fout");
					}
				},
				error: function(data){
					//error
					console.log("Error ", data);
				}
			});
		}
    });
	
	$('#datepicker-container .input-group.date').datepicker({
		weekStart: 1,
		todayHighlight: true,
		format: 'dd-mm-yyyy',
		autoclose: true,
		language: "nl",
		changeMonth: true,
		changeYear: true
	});

	$('.selectpicker').selectpicker('render');
	
	$('.startTimepicker').timepicker({
		defaultTime: '08:30:00',
		showSeconds:true,
		showMeridian: false
	});

	$('.endTimepicker').timepicker({
		defaultTime: '16:30:00',
		showSeconds:true,
		showMeridian: false
	});
	
	$( "#allergies" ).change(function() {
		var values = $(this ).val();

		var antbioticaExists = false;
		var overigExists = false;
		
		for(var k in values) {
			if(values[k] == "Antbiotica")
				antbioticaExists = true;
			
			if(values[k] == "Overig")
				overigExists = true;
		}
		
		if(antbioticaExists){
			$( "#label_allergy_description" ).addClass('required');
		}else{
			$( "#label_allergy_description" ).removeClass('required');
			$( "#allergy_description" ).val('');
		}
		
		if(overigExists){
			$( "#label_allergies_other" ).addClass('required');
		}else{
			$( "#label_allergies_other" ).removeClass('required');
			$( "#allergies_other" ).val('');
		}
	});

	/*$("input#patdoc_patient_bsnnummer").bind('focus', function(){ $(this).autocomplete("search"); } );
	
	$("input#patdoc_patient_bsnnummer").autocomplete({
		source: baseUrl + "/beheer/patient/patient-autocomplete",
		select: function( event, ui ) {
			var bsnnummer = ui.item.value;

			$.ajax({
				type: "POST",
				url: baseUrl + "/beheer/patient/get-patient-by-bsnnummer",
				data: { bsnnummer: bsnnummer },
				success: function(response) {
					if(response.success){
						var patient = response.patient;
						$('input[name="patdoc_patient_gender"][value="'+patient.person_gender+'"]').prop('checked', true);
						$("input#patdoc_patient_initials").val(patient.person_initials);
						$("input#patdoc_patient_prefix").val(patient.person_prefix);
						$("input#patdoc_patient_firstname").val(patient.person_firstname);
						$("input#patdoc_patient_lastname").val(patient.person_lastname);
						$("input#patdoc_patient_id").val(patient.patient_id);
						
					}else{
						alert(response.message);
					}

					
				},
				error: function(data){
					//error
					console.log("Error ", data);
				}
			});
		}
	});*/
	
	$('#schedule-calendar-dialog-form').submit(function(e) {
		e.preventDefault();
		
		var event_id 	= $('#event_id').val();
		var event_type 	= $('#eventType').val();

		
		if(event_id != "" && event_type != ""){
			
			var data = new Object();
			data['event_id'] 	= event_id;
			data['event_type'] 	= event_type;
			
			var post = { data: JSON.stringify(data)};
					
			$.ajax({
				type: "POST",
				url: baseUrl + "/beheer/calendar/event-change",
				data: post,
				success: function(response) {
					if(response.success){
						$('#schedule-calendar-dialog').modal('hide');

						if('Verwijderen' == event_type){
							$('#schedule-calendar').fullCalendar('removeEvents', event_id);
						}else{
							var event = $('#schedule-calendar').fullCalendar( 'clientEvents', event_id);
						
							var changedEvent = event[0];
							
							if(event_type == "Studie"){
								changedEvent.className = "bg-green";
							}else if(event_type == "Vakantie"){
								changedEvent.className = "bg-purple";
							}else if(event_type == "Planning"){
								changedEvent.className = "bg-blue";
							}else if(event_type == "Compensatie"){
								changedEvent.className = "bg-red";
							}else if(event_type == "Bijzonderheid"){
								changedEvent.className = "bg-orange";
							}else if(event_type == "Feestdag"){
								changedEvent.className = "bg-green2";
							}else if(event_type == "Naarhuisartstandarts"){
								changedEvent.className = "bg-blue2";
							}else if(event_type == "Ziek"){
								changedEvent.className = "bg-grey";
							}else if(event_type == "Meeloopdag"){
								changedEvent.className = "bg-blue3";
							}else if(event_type == "Huisartsenpraktijk"){
								changedEvent.className = "bg-rose";
							}else if(event_type == "Regiefunctie"){
								changedEvent.className = "bg-grey2";
							}
							
							$('#schedule-calendar').fullCalendar('renderEvent', changedEvent, true);
						}
					}else{
						alert(response.message);
					}

					
				},
				error: function(data){
					//error
					console.log("Error ", data);
				}
			});
			
		}else{
			alert('Parameter ontbreekt.');
		}
	
	});
	
	$('#calendar-dialog-form').submit(function(e) {
		e.preventDefault();
		
		var event_id = $('#event_id').val();
		
		if(event_id != ""){
			event_type 	 = $('input[name=eventType]:checked').val();
			if(event_type == undefined){
				alert('Event soort niet bekend');
			}else{
				var data = new Object();
				data['event_id'] 	= event_id;
				data['event_type'] 	= event_type;
				
				var post = { data: JSON.stringify(data)};
						
				$.ajax({
					type: "POST",
					url: baseUrl + "/beheer/calendar/change-event",
					data: post,
					success: function(response) {
						if(response.success){
							$('#calendar-dialog').modal('hide');
							
							var event = $('#calendar').fullCalendar( 'clientEvents', event_id);
							
							var changedEvent = event[0];
							
							if(event_type == "Studie"){
								changedEvent.className = "bg-green";
							}else if(event_type == "Vakantie"){
								changedEvent.className = "bg-purple";
							}else if(event_type == "Planning"){
								changedEvent.className = "bg-blue";
							}
							$('#calendar').fullCalendar('renderEvent', changedEvent, true);
							
							//$('#calendar').fullCalendar('updateEvent', changedEvent);

						}else{
							alert(response.message);
						}

						
					},
					error: function(data){
						//error
						console.log("Error ", data);
					}
				});
			}
			
		}else{
			alert('Event identifier niet bekend.');
		}
	
	});
	
	$('#monthsList').change( function() {
		if($(this).val() == 0){
			//$("#monthsList-select").remove();
			$("#roosteringContentDiv").remove();
			alert("U moet een maand selecteren.");
		}else{
			$("#listNursesForm").submit();
		}
	});

	/* initialize the external events for patients
	-----------------------------------------------------------------*/
	makePatientDraggable();
		
	$('#ContractForm').submit(function(e) {
		var checkboxes = $(this).find(':checkbox');

		var isValid = true;
		checkboxes.each(function( index ) {
			if($(this).is(':checked')) {
				
				var name = $( this ).attr('name');
				
				var id = name.split('_');
				id = id[2].slice(0, -1);
				
				if($('#working_starttime_'+id).val() == ""){
					isValid = false;
					$('#working_starttime_'+id).addClass('parsley-error');
				}else{
					$('#working_starttime_'+id).removeClass('parsley-error');
				}
				
				if($('#working_endtime_'+id).val() == ""){
					isValid = false;
					$('#working_endtime_'+id).addClass('parsley-error');
				}else{
					$('#working_endtime_'+id).removeClass('parsley-error');
				}
			}
		});
		
		if(!isValid){
			e.preventDefault();
			alert('Waarde is vereist en kan niet leeg zijn.');
		}
	});

	$('select[name=department_organization_id]').change(function() {
		if($(this).val() != ""){
			var data = new Object();
			data['organization_id'] 	= $(this).val();
			var post = { data: JSON.stringify(data)};
					
			$.ajax({
				type: "POST",
				url: baseUrl + "/beheer/hospital/get-branches-by-organization",
				data: post,
				success: function(response) {
					if(response.success){
						var departments = response.departments;
						var optionsAsString = "<option value=''>---- Selecteer ----</option>";
						$.each( departments, function( key, value ) {
						  optionsAsString += "<option value='" + key + "'>" + value + "</option>";
						});
						
						$('select[name=department_branch_id]').html( optionsAsString );
					}

					
				},
				error: function(data){
					//error
					console.log("Error ", data);
				}
			});
		}
	});
	
	/**
	 * open pop up add comment
	 */
	$('#add-new-city-link').click(function() {
		$('#new-city-error-msg').remove();
		$('#add_city_label').val(''); 
		 
		$("#add-new-city-dialog").modal('show');
	});
	
	$('select[name=staff_organization_id]').change(function() {
		//$('select[name^=patient_departments]').html('');
		
		if( $('select[name^=staff_branch_id]').length )
		{
			$('select[name^=staff_branch_id]').empty();
		}
		
		if( $('select[name^=patient_departments]').length )
		{
			$('select[name^=patient_departments]').empty();
		}
		
		if( $('select[name^=doctor_departments]').length )
		{
			$('select[name^=doctor_departments]').empty();
			
			if( $('#department_responsible_id').length )
			{
				$('#department_responsible_id').empty();
			}
			if( $('#msvt_responsible_id').length )
			{
				$('#msvt_responsible_id').empty();
			}
		}
		
		if( $('select[name^=nurse_departments]').length )
		{
			$('select[name^=nurse_departments]').empty();
		}
		
		if($(this).val() != ""){
			var data = new Object();
			data['organization_id'] 	= $(this).val();
			var post = { data: JSON.stringify(data)};
					
			$.ajax({
				type: "POST",
				url: baseUrl + "/beheer/hospital/get-branches-by-organization",
				data: post,
				success: function(response) {
					if(response.success){
						var departments = response.departments;
						var optionsAsString = "<option value=''>---- Selecteer ----</option>";
						$.each( departments, function( key, value ) {
						  optionsAsString += "<option value='" + key + "'>" + value + "</option>";
						});
						
						$('select[name=staff_branch_id]').html( optionsAsString );
						
						if(response.organizationType == "Thuiszorgorganisatie"){
							if( $('#nurse_address_fieldset').length )
							{
								$('#nurse_address_fieldset').show();
								$('label[for="Person[person_email]"]').addClass('required');
							}
						}else{
							if( $('#nurse_address_fieldset').length )
							{
								$('#nurse_address_fieldset').hide();
								$('label[for="Person[person_email]"]').removeClass('required');
							}
						}
					}
					
				},
				error: function(data){
					//error
					console.log("Error ", data);
				}
			});
		}
	});
	
	$('select[name=staff_branch_id]').change(function() {
		if($(this).val() != ""){
			var data = new Object();
			data['branch_id'] 	= $(this).val();
			var post = { data: JSON.stringify(data)};
					
			$.ajax({
				type: "POST",
				url: baseUrl + "/beheer/department/get-departments-by-branch",
				data: post,
				success: function(response) {
					if(response.success){
						var departments = response.departments;
						var optionsAsString = "";
						$.each( departments, function( key, value ) {
						  optionsAsString += "<option value='" + key + "'>" + value + "</option>";
						});
						
						if ($('select[name^=doctor_departments]').length !== 0) {
							$('select[name^=doctor_departments]').html( optionsAsString );
						}else if ($('select[name^=nurse_departments]').length !== 0) {
							var optionsAsString = "<option value=''>---- Selecteer ----</option>";
							$.each( departments, function( key, value ) {
							  optionsAsString += "<option value='" + key + "'>" + value + "</option>";
							});
							$('select[name^=nurse_departments]').html( optionsAsString );
						}else if ($('select[name^=patient_departments]').length !== 0) {
							$('select[name^=patient_departments]').html( optionsAsString );
						}
					}

					
				},
				error: function(data){
					//error
					console.log("Error ", data);
				}
			});
		}
	});
 });
 
function editOrderAddress()
{
	$("a[name='order-address-link']").click(function(event) {
		event.preventDefault();
		
		EmptyCendrisCheckAdresMs();
		$("input[name='address_id']").val('');
		$("input[name='address_post_code']").val('');
		$("input[name='address_street']").val('');
		$("input[name='address_house_number']").val('');
		$("input[name='address_house_addition_number']").val('');
		$("input[name='address_city']").val('');
		
		var entityId = $(this).attr('data-entity-address-id');

		var data 			= new Object();
		data['addressId'] 	= $(this).attr('data-address-id');

		$.ajax({
			type: "POST",
			url: baseUrl + "/beheer/address/get-address-by-id",
			data: data,
			success: function(response) {
				
				if(response.error || response.error == "true"){
					alert(response.result);
				}else if(!response.error || response.error == "false"){

					$("input[name='address_entity_id']").val(entityId);
					if("newDeliveryAddress" != response.result){
						var aAddress = response.result;
						$("input[name='address_id']").val(aAddress.address_id);
						$("input[name='address_post_code']").val(aAddress.address_post_code);
						$("input[name='address_street']").val(aAddress.address_street);
						$("input[name='address_house_number']").val(aAddress.address_house_number);
						$("input[name='address_house_addition_number']").val(aAddress.address_house_addition_number);
						$("input[name='address_city']").val(aAddress.address_city);
					}else{
						$("input[name='address_id']").val("newDeliveryAddress");
					}
					
					$( "#order-address-modal" ).modal('show');
				}
			},
			error: function(data){
				//error
				console.log("Error ", data);
			}
		});
	});
 }

 function EmptyCendrisCheckAdresMs()
 {
	$( "#cendrisCheckAdresMsg" ).text('');
	$( "#cendrisCheckAdresMsg" ).removeClass('alert alert-danger');
 }
 
function getEventObject(event)
{
	var eventObject 			= new  Object();
	eventObject['event_id']     = event.id;
	eventObject['title']  		= event.title;
	eventObject['start']  		= $.fullCalendar.formatDate(event.start, "yyyy-MM-dd HH:mm:ss");
	eventObject['end']    		= $.fullCalendar.formatDate(event.end, "yyyy-MM-dd HH:mm:ss");
	eventObject['allDay'] 		= event.allDay;
	eventObject['start_day']  	= $.fullCalendar.formatDate(event.start, "dd");
	eventObject['start_month'] 	= $.fullCalendar.formatDate(event.start, "MM");
	eventObject['start_year']  	= $.fullCalendar.formatDate(event.start, "yyyy");
	eventObject['start_time']  	= $.fullCalendar.formatDate(event.start, "HH:mm:ss");
	eventObject['end_time']  	= $.fullCalendar.formatDate(event.end, "HH:mm:ss");
	
	return eventObject;
}
function showComment(span)
{
	var span_id = $(span).attr('id');
	span_id = span_id.split("_");

	var event_id = span_id[3];

	$.ajax({
		type: "POST",
		url: baseUrl + "/beheer/patient/get-patient-comments",
		data:{
			'event_id' : event_id
		},
		success: function(response) {
			if(response.success){
				$( "#planningEventComment" ).text(response.comments);
				$( "#planningEventId" ).val(event_id);

				$( "#showEventComment" ).modal('show');
			}else{
				alert("Fout");
			}
		},
		error: function(data){
			//error
			console.log("Error ", data);
		}
	});
}

function refreshCalendar(events)
{
	var currentDate = $('#patient-calendar').fullCalendar('getDate');
	$('#patient-calendar').empty();

	getCalendar(events);

	$('#patient-calendar').fullCalendar('gotoDate', currentDate);
	$( "#standBy-modal" ).modal( "hide" );
}
 
function makePatientDraggable()
{
	$('#external-events .external-event').each(function() {
		var $patient_id 	= $(this).attr('id');
		var text        	= $(this).text();
		var indexOf     	= text.indexOf("Extra informatie"); 
		var title       	= text.substring(0, indexOf);
		var comment 		= $("#comment_"+$patient_id).val();
		var plannerComment 	= $("#nurse_comment_"+$patient_id).val();

		var eventObject = {
			title			: $.trim($(this).attr('data-title')),
			className		: $(this).attr('data-bg'),
			media			: $(this).attr('data-media'),
			description		: $(this).attr('data-desc'),
			msvtId 			: $(this).attr('date-msvt-id'),
			insuranceId 	: $(this).attr('data-insurance-id'),
			patient_id 		: $patient_id,
			comment 		: comment,
			plannerComment 	: plannerComment
		};
		
		$(this).data('draggedObject', eventObject);
		
		$(this).draggable({
			zIndex: 999,
			revert: true,
			revertDuration: 0
		});
	});
}
 
function getEventsByNurse(nurse_id)
{
	$.ajax({
		url: baseUrl + "/beheer/planning/get-nurse-events",
		data: {'nurse_id' : nurse_id},
		//async: false,
		success: function(response) {
			$('#patient-calendar').empty();
			getCalendar(response.events);
		},
		error: function(data){
			//error
		}
	});

}
 
function startAndEndOfWeek(date) 
{
	// If no date object supplied, use current date
	// Copy date so don't modify supplied date
	var now = date? new Date(date) : new Date();

	// set time to some convenient value
	now.setHours(0,0,0,0);

	// Get the previous Monday
	var monday = new Date(now);
	monday.setDate(monday.getDate() - monday.getDay() + 1);

	// Get next Sunday
	var sunday = new Date(now);
	sunday.setDate(sunday.getDate() - sunday.getDay() + 7);

	// Return array of date objects
	return [monday, sunday];
}
//----------------function for checkbox All------------------------
 function uncheckAll(element)
 {
 	var id = "check_all_"+element.name+"";

 	if(!$( this ).prop('checked'))
 		$('input[name="'+id+'"]').prop('checked', false);	
 }

 function checkAll(element)
 {
 	var splitName = element.id.split("check_all_");

 	if($(element).prop('checked')){
 		$('input[name="'+splitName[1]+'"]').prop('checked', true);
 	}else{
 		$('input[name="'+splitName[1]+'"]').prop('checked', false);
 	}
 }
 //---------------End fonction checkbox--------------
 //--------------function downloadPDf ------------
 var globalCharts = {};

 function downloadPDf(divId, tableId) 
 {
    var htmlContent = '<img id="image1" src="' + globalCharts[divId.id].getImageURI() + '">';
    var tableHtml   = $(tableId).html();
    $("#imgContentHidden").val(htmlContent);
    $("#tableContentHidden").val(tableHtml);
    //$("#nameStatisticHidden").val(divId.id);
    $('#downloadGraphForm').submit();
 }
//--------------function downloadExcel ------------
 function downloadExcel(nameCharts,aResultat){
	$("#ExeclContentHidden").val(nameCharts);
	$("#is_post_excel").val(aResultat);
	$('#downloadExcelForm').submit();
 }
 //------------- Notification  ---
 function readNotify(row_id,nameTable,notif){
		if(nameTable=='news_item'){
			var popId = "#modal-dialog-" + row_id + notif;
			$(popId).modal('show');
		}
		var data = new Object();
		data['tableRowId'] = row_id;
		data['nameTable'] = nameTable;
		$.ajax({
			type: "POST",
			url: baseUrl + "/beheer/notification/notify",
			data: data,
			success: function(response) {
				if(response.success){
					
				}else{
					alert(response.message);
				}
			},
			error: function(data){
				//error
				console.log("Error ", data);
			}
		});
		
	 }
//------------------------------------------------*/
 
 
 