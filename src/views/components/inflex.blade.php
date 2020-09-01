@props(['id'=>'img'])
<div class="form-group" id="<?= $id ?>">
	<div class="container-preview w-100">
		<div class="image-preview img-thumbnail" style="background-image:url(<?= url('images/noimage.png') ?>)">
			<div class="img-add"></div>
			<div class="progress">
			  <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar"></div>
			</div>
		</div>
		<div class="image-preview img-thumbnail template"
		style="background-image:url(<?= url('images/noimage.png') ?>)">
			<a class="btn btn-danger img-remove" href="javascript:;"><i class="fas fa-times"></i></a>
		</div>
	</div>
	<input type="file" class="img-input">
	<div class="invalid-feedback"></div>
	<?= $slot ?>
</div>