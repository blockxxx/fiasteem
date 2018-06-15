<!DOCTYPE html>
<html lang="en">
<head>
	<!-- Required meta tags -->
	<meta charset="utf-8">
	@yield('metaTags')
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	<meta name="csrf-token" content="{{ csrf_token() }}">


	<!-- Favicons -->
  <link href="{{url('img/logo.png')}}" rel="icon">
  <link href="{{url('img/logo.png')}}" rel="apple-touch-icon">

  <!-- Google Fonts -->
  <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,700,700i|Raleway:300,400,500,700,800|Montserrat:300,400,700" rel="stylesheet">

  <!-- Bootstrap CSS File -->
  <link href="{{url('lib/bootstrap/css/bootstrap.min.css')}}" rel="stylesheet">

  <!-- Libraries CSS Files -->
  <link href="{{url('lib/font-awesome/css/font-awesome.min.css')}}" rel="stylesheet">
  <link href="{{url('lib/animate/animate.min.css')}}" rel="stylesheet">
  <link href="{{url('lib/ionicons/css/ionicons.min.css')}}" rel="stylesheet">
  <link href="{{url('lib/owlcarousel/assets/owl.carousel.min.css')}}" rel="stylesheet">
  <link href="{{url('lib/magnific-popup/magnific-popup.css')}}" rel="stylesheet">
  <link href="{{url('lib/ionicons/css/ionicons.min.css')}}" rel="stylesheet">

  <!-- Main Stylesheet File -->
  <link href="{{url('css/style.css')}}" rel="stylesheet">



	
{{-- 	<link href="{{ url('css/bootstrap.min.css') }}" rel="stylesheet">
	<link href="{{ url('css/core-6a1c2ced1d.min.css') }}" rel="stylesheet">
	<link href="{{ url('css/app-3e9bd7d326.min.css') }}" rel="stylesheet">

	<link rel="icon" type="image/png" href="{{ url('image/fiasteem.png') }}"> --}}
	@yield('stylesheet')
	@yield('title')
	<title>FiaSteem</title>
</head>
<body>

	{{-- {{dd(Auth::user()->unreadNotificationsSingle([2,3,4]))}} --}}
	{{-- @include('frontend.partials._messages') --}}
	@include('frontend.partials._header')
		
	<div class="" id="app">
		@yield('content')
	</div>
{{-- 	@if(Auth::check())
		@include('frontend.partials._floatingmenu')
		@include('frontend.partials.blogfloating')
	@endif --}}
	@include('frontend.partials._footer')
	{{-- @if(Auth::user())
		@include('frontend.partials._quicksidebar')
	@endif --}}
{{-- 	<div id="fb-root"></div>
	<script>
	(function(d, s, id) {
	  var js, fjs = d.getElementsByTagName(s)[0];
	  if (d.getElementById(id)) return;
	  js = d.createElement(s); js.id = id;
	  js.src = 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.11&appId=137292706911714';
	  fjs.parentNode.insertBefore(js, fjs);
	}(document, 'script', 'facebook-jssdk'));
	</script> --}}

	<script src="{{url('lib/jquery/jquery.min.js')}}"></script>
	<script src="{{url('lib/jquery/jquery-migrate.min.js')}}"></script>
	<script src="{{url('lib/bootstrap/js/bootstrap.bundle.min.js')}}"></script>
	<script src="{{url('lib/easing/easing.min.js')}}"></script>
	<script src="{{url('lib/superfish/hoverIntent.js')}}"></script>
	<script src="{{url('lib/superfish/superfish.min.js')}}"></script>
	<script src="{{url('lib/wow/wow.min.js')}}"></script>
	<script src="{{url('lib/owlcarousel/owl.carousel.min.js')}}"></script>
	<script src="{{url('lib/magnific-popup/magnific-popup.min.js')}}"></script>
	<script src="{{url('lib/sticky/sticky.js')}}"></script>
	{{-- <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyD8HeI8o-c1NppZA-92oYlXakhDPYR7XMY"></script> --}}
	<!-- Contact Form JavaScript File -->
	<script src="{{url('contactform/contactform.js')}}"></script>

	<!-- Template Main Javascript File -->
	<script src="{{url('js/main.js')}}"></script>
	<script>


		$(window).ready(function(){
			$.ajaxSetup({
				headers: {
					'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
				}
			});
	</script>
	@yield('javascript')    
</body>
</html>