@extends('altar::page',['title'=>'Inflex'])
@section('heading')
<i class="far fa-image"></i> Inflex
@endsection
@section('content')
<div class="card">
	<div class="card-body">
		<x-alt-inflex id="image">
			<input type="text" name="images" class="form-control" id="images">
		</x-alt-inflex>
	</div>
</div>
@endsection

@push('css')
<link rel="stylesheet" type="text/css" href="{{url('altar/inflex/css/inflex.css')}}">
@endpush
@push('js')
<script type="text/javascript" src="{{ url('altar/inflex/js/inflex.js') }}"></script>
<script type="text/javascript">
$(function() {

	var img = $("#image").imageUpload({
		maxFile : 10,
		urlUpload : "{{ route('demo.inflex') }}",
		urlDelete : "{{ route('demo.inflex') }}",
		csrf_token : "{{ csrf_token() }}",
		name : 'image',
	});

	img.uploadDone(function(e) {
		$('#images').val(e);
	});

	img.removeDone(function(e) {
		$('#images').val(e);
	});

	img.imageDefaults = JSON.parse( "["+ $('#images').val() +"]");
})
</script>
@endpush