@extends('frontend.master_frontend')

@section('content')
    <div class="container">

      <div class="row py-4" id="app" >
        <div class="col-md-6 order-md-2 mb-4 d-none d-md-block">
          <h4 class="d-flex justify-content-between align-items-center mb-3">
            <span class="text-muted">Some Information</span>
            <span class="badge badge-secondary badge-pill">3</span>
          </h4>
          <ul class="list-group mb-3">
            <li class="list-group-item d-flex justify-content-between lh-condensed">
              <div>
                <h6 class="my-0">Product name</h6>
                <small class="text-muted">Brief description</small>
              </div>
              <span class="text-muted">$12</span>
            </li>
            <li class="list-group-item d-flex justify-content-between lh-condensed">
              <div>
                <h6 class="my-0">Second product</h6>
                <small class="text-muted">Brief description</small>
              </div>
              <span class="text-muted">$8</span>
            </li>
            <li class="list-group-item d-flex justify-content-between lh-condensed">
              <div>
                <h6 class="my-0">Third item</h6>
                <small class="text-muted">Brief description</small>
              </div>
              <span class="text-muted">$5</span>
            </li>
            <li class="list-group-item d-flex justify-content-between bg-light">
              <div class="text-success">
                <h6 class="my-0">Promo code</h6>
                <small>EXAMPLECODE</small>
              </div>
              <span class="text-success">-$5</span>
            </li>
            <li class="list-group-item d-flex justify-content-between">
              <span>Total (USD)</span>
              <strong>$20</strong>
            </li>
          </ul>
        </div>
        
        <registration-form></registration-form>
      </div>
    </div>
@endsection
@section('javascript')
  <script type="text/javascript">
    var vm = new Vue({
      el: '#app',
      data :{

      },
      methods:{
        initialData(){
          return {
            first_name : '',
            last_name: '',

          }
        }
      }
    });
  </script>
@endsection
