//controller
app.controller('conversionViewCtrl',['$scope', 'currencyApiFactory' ,  'currencyCodesFactory', function($scope, currencyApiFactory, currencyCodesFactory) {
    
   $scope.showResults = false;
	$scope.showLoadingIcon = false;
	$scope.selectCurrencyCodes =  currencyCodesFactory.getCurrencies();
	$scope.input = {
		targetCurr :"PKR",
		sourceCurr : "USD",
		amount : 1
	};
	
	$scope.getRate = function (input){
		 $scope.result = input.amount * (currencyApiFactory.getRate(input.targetCurr) / currencyApiFactory.getRate(input.sourceCurr));
		 $scope.result = $scope.result.toFixed(2)
		 $scope.showResults = true;
	};
	
	
}]);

//controller
app.controller("ratesViewCtrl",['$scope', 'currencyApiFactory', 'timeConvertFactory', 'currencyCodesFactory',
	                function($scope, currencyApiFactory, timeConvertFactory, currencyCodesFactory){
	
		$scope.countries = [];
		$scope.showLoadingIcon = true;
		$scope.lastUpdateTime = {};
		$scope.selectCurrencyCodes = {};
		$scope.selectCurrencyCodes =  currencyCodesFactory.getCurrencies();
		$scope.targetCurr = "USD";
		//console.log($scope.selectCurrencyCodes);
	   var rates = currencyApiFactory.getRates().then(function(response){
			if (response.data.success == true){
				rates = response.data.quotes;
				$scope.lastUpdateTime = timeConvertFactory.convert(response.data.timestamp);
				angular.forEach( currencyCodesFactory.defaultCodes, function(val){
					this.push({
							code: val,
							name: currencyCodesFactory.getCurrencies()[val],
							rate: parseFloat(rates["USD" + val]).toFixed(2)
							
					})
				}, $scope.countries);
				$scope.showLoadingIcon = false;
			}
		});
		
		$scope.addCurrencyBox = function (input){
			console.log(input);
			$scope.countries.push({
						code: input,
						name: currencyCodesFactory.getCurrencies()[input],
						rate: parseFloat(rates["USD"+input]).toFixed(2)
	
				});
		};
		//console.log($scope.countries);
}]);

app.controller('pastHistoryCtrl',['$scope', 'histCurrencyApiFactory' , 'currencyCodesFactory','chartFactory','$stateParams' ,
			function($scope, histCurrencyApiFactory, currencyCodesFactory, chartFactory, $stateParams) {
  
	$scope.selectYears = histCurrencyApiFactory.years;
	//console.log($stateParams);
	if ($stateParams.currency == "" && $stateParams.year == ""){
		$scope.year = '2015';
		$scope.currency = "PKR";
	}
	else{
		$scope.year = $stateParams.year;
		$scope.currency = $stateParams.currency;	
	}
	$scope.selectCurrencyCodes =  currencyCodesFactory.getCurrencies();
	$scope.showLoadingIcon = false;
	$scope.showGraph = false;
	var dates = histCurrencyApiFactory.dates;
	var rates = [];
	$scope.getMonthlyRates = function(){
		rates =[];
		$scope.showLoadingIcon = true;
		$scope.showGraph = false;
		
		for(var i = 0; i < 12; ++i){
			histCurrencyApiFactory.getHistRates($scope.currency, $scope.year + dates[i] ).then(function(response){
					if (response.data.success == true){
						//console.log(response.data);
						rates.push({
								currency : $scope.currency,
								month : response.data.date.substring(5, 7),
								rate : response.data.quotes["USD" + $scope.currency] 
							});
						
						//console.log(rates);
						if (rates.length ==  12){
							console.log(rates);
							chartFactory.draw(rates);
							$scope.showLoadingIcon = false;
							$scope.showGraph = true;
						}	
					}
			});
		}

	}
	$scope.getMonthlyRates();
	
}]);