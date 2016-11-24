//controller
app.controller('conversionViewCtrl',['$scope', 'currencyApiFactory' ,  'currencyCodesFactory', function($scope, currencyApiFactory, currencyCodesFactory) {
    
   $scope.showResults = false;
	$scope.showLoadingIcon = false;
	//$scope.currencyCodes = {};
	
	$scope.selectCurrencyCodes =  currencyCodesFactory.getCurrencies();
	$scope.input = {
		targetCurr :"PKR",
		sourceCurr : "USD",
		amount : 1
	};
	console.log($scope.selectCurrencyCodes);
	console.log($scope.input);
	$scope.getRate = function (input){
		console.log(input.targetCurr);
		 $scope.result = input.amount * (currencyApiFactory.getRate(input.targetCurr) / currencyApiFactory.getRate(input.sourceCurr));
		 $scope.result = $scope.result.toFixed(2)
		 $scope.showResults = true;
	};
	
	
}]);

app.controller("ratesViewCtrl",['$scope', 'currencyApiFactory', 'timeConvertFactory', 'currencyCodesFactory',
	                function($scope, currencyApiFactory, timeConvertFactory, currencyCodesFactory){
	
		$scope.countries = [];
		$scope.showLoadingIcon = true;
		var codes = 
			['USD', 'EUR', 'CAD', 'SAR', 'PKR', 'AED',  'CNY', 'JPY', 'SGD', 'BDT', 'ILS', 'IRR', 'AFN', 'TRY', 'TWD', 'MYR', 'RUB', 'UAH', 'KRW', 'IQD' ];
		$scope.lastUpdateTime = {};
		$scope.selectCurrencyCodes = {};
		$scope.selectCurrencyCodes =  currencyCodesFactory.getCurrencies();
		$scope.targetCurr = "USD";
		console.log($scope.selectCurrencyCodes);
	   var rates = currencyApiFactory.getRates().then(function(response){
			rates = response.data.quotes;
			$scope.lastUpdateTime = timeConvertFactory.convert(response.data.timestamp);
			angular.forEach(codes, function(val){
				this.push({
						code: val,
						name: currencyCodesFactory.getCurrencies()[val],
						rate: parseFloat(rates["USD" + val]).toFixed(2)
						
				})
			}, $scope.countries);
			$scope.showLoadingIcon = false;
			
		});
		
		$scope.addCurrencyBox = function (input){
			console.log(input);
			$scope.countries.push({
						code: input,
						name: currencyCodesFactory.getCurrencies()[input],
						rate: parseFloat(rates["USD"+input]).toFixed(2)
	
				});
		};
		
		console.log($scope.countries);
}]);