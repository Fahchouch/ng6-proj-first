$(document).ready(function () {
	 $('.isDatepicker').datepicker({
		todayHighlight: true,
		format: 'dd-mm-yyyy',
		autoclose: true,
		language: "nl"
	});

	$('.selectpicker').selectpicker('render');
	
	$('.startTimepicker').timepicker({
		defaultTime: '08:30',
		showMeridian: false
	});

	$('.endTimepicker').timepicker({
		defaultTime: '17:30',
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

	$("input#patdoc_patient_bsnnummer").autocomplete({
		source: baseUrl + "/beheer/patient/patient-autocomplete",
		select: function( event, ui ) {
			var bsnnummer = ui.item.value;

			$.ajax({
				type: "POST",
				url: baseUrl + "/beheer/patient/get-patient-by-bsnnummer",
				data: { bsnnummer: bsnnummer },
				success: function(response) {
					console.log(response);
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
	});
	
	$('#schedule-calendar-dialog-form').submit(function(e) {
		e.preventDefault();
		
		var event_id = $('#event_id').val();
		
		if(event_id != ""){
			event_type 	 = $('input[name=eventType]:checked').val();
			if(event_type == undefined){
				alert('Onbekend soort evenement');
			}else{
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
							
							var event = $('#schedule-calendar').fullCalendar( 'clientEvents', event_id);
							
							var changedEvent = event[0];
							
							if(event_type == "Studie"){
								changedEvent.className = "bg-green";
							}else if(event_type == "Vakantie"){
								changedEvent.className = "bg-purple";
							}else if(event_type == "Planning"){
								changedEvent.className = "bg-blue";
							}
							
							if('Verwijderen' == event_type){
								$('#schedule-calendar').fullCalendar('removeEvents', event_id);
							}else{
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
			}
			
		}else{
			alert('Onbekend evenement identifier');
		}
	
	});
	
	$('#calendar-dialog-form').submit(function(e) {
		e.preventDefault();
		
		var event_id = $('#event_id').val();
		
		if(event_id != ""){
			event_type 	 = $('input[name=eventType]:checked').val();
			if(event_type == undefined){
				alert('Onbekend soort evenement');
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
			alert('Onbekend evenement identifier');
		}
	
	});
	
	$('#nursesList').change( function() {
		if($(this).val() == 0){
			$("#monthsList-select").remove();
			alert("dank je wel om een verpleegster te selecteren");
		}else{
			$("#listNursesForm").submit();
		}
	});
	
	$('#monthsList').change( function() {
		if($(this).val() == 0){
			$("#monthsList-select").remove();
			alert("dank je wel om een Maand te selecteren");
		}else{
			$("#listNursesForm").submit();
		}
	});

	/* initialize the external events
	-----------------------------------------------------------------*/
	$('#external-events .external-event').each(function() {
		var eventObject = {
			title: $.trim($(this).attr('data-title')),
			className: $(this).attr('data-bg'),
			media: $(this).attr('data-media'),
			description: $(this).attr('data-desc')
		};
		
		$(this).data('eventObject', eventObject);
		
		$(this).draggable({
			zIndex: 999,
			revert: true,
			revertDuration: 0
		});
	});
		
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
			alert('Waarde is vereist en kan niet leeg zijn');
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

	$("#add-new-city-form").submit(function(e){
		e.preventDefault(e);

		$('#new-city-error-msg').remove();
		var cityName = $('#add_city_label').val();
		
		if($.trim(cityName) == '') {
			$("#new-city-modal-body").append('<div id="new-city-error-msg" class="alert alert-danger fade in m-b-15"><strong>Stads naam : </strong>Waarde is vereist en kan niet leeg zijn</div>');
		}else{
			var data = new Object();
			data['city_label'] 	= $.trim(cityName);
			var post = { data: JSON.stringify(data)};
			
			$.ajax({
				type: "POST",
				url: baseUrl + "/beheer/city/add",
				data: post,
				success: function(response) {
					if(response.success){
						var cities = response.cities;
						var optionsAsString = "<option value=''>---- Selecteer ----</option>";
						$.each(cities, function( key, value ) {
							var selected = "";
							if(value == cityName)
								selected = "selected";
							optionsAsString += "<option value='" + key + "' "+selected+">" + value + "</option>";
						});
						
						$('select[name="Address[address_city_id]"]').html( optionsAsString );
						$("#new-city-modal-body").append('<div id="new-city-error-msg" class="alert alert-success fade in m-b-15">De stadgegevens zijn met succes opgeslagen.</div>');
						
						$("#add-new-city-dialog" ).modal('hide');
					}else{
						$("#new-city-modal-body").append('<div id="new-city-error-msg" class="alert alert-danger fade in m-b-15">Er is een fout opgetreden</div>');
					}
				},
				error: function(data){
					//error
					console.log("Error ", data);
				}
			});
		}
	});
	
	$('select[name=staff_organization_id]').change(function() {
		$('select[name^=patient_departments]').html('');
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