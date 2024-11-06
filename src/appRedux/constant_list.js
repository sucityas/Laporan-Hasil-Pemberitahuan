import * as moment from 'moment';
import _ from 'lodash';

let thn = [];

for (var i = 2011; i <= parseInt(moment().add('years', 1).year()); i++) {
	thn.push({ label: String(i), value: String(i) });
}

const is_expired = (mydate) => {

	var expired = false;

	if (mydate) {
		var now = new Date();
		var then = new Date(mydate);
		var timeDiff = then.getTime() - now.getTime();
		var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
		expired = (diffDays < 0);
	}

	return expired;

}

const find_label = (list, value, value_field, label_field, prefix, suffix) => {

	var val = _.find(list, function (o) {
		return String(o[value_field]) === String(value);
	});

	prefix = !_.isUndefined(prefix) && !_.isNull(prefix) ? prefix : '';

	suffix = !_.isUndefined(suffix) && !_.isNull(suffix) ? suffix : '';

	return (val) ? prefix + val[label_field] + suffix : '';

}

const tgl = (tgl) => {

	return (tgl) ? moment(tgl).format('DD-MM-YYYY') : null;

}

const tglwaktu = (tglwaktu) => {

	return (tglwaktu) ? moment(tglwaktu).format('DD-MM-YYYY HH:mm:ss') : null;

}

function jumlah(angka) {
	var number_string = (angka) ? String(angka) : '0',
	split = number_string.split('.'),
	sisa = split[0].length % 3,
	rupiah = split[0].substr(0, sisa),
	ribuan = split[0].substr(sisa).match(/\d{3}/gi);
	console.log("ribuan",ribuan)
	console.log("Sisa", sisa)

	var separator = '';

	if (ribuan) {
		separator = sisa ? '.' : '';
		rupiah += separator + ribuan.join('.');
	}
	rupiah = split[1] !== undefined ? rupiah + ',' + split[1] : rupiah;
	return (rupiah ? rupiah : rupiah > 0 ? null : '');
}


function pad(num) {
	return ("0" + num).slice(-2);
}

function totalwaktu(secs) {
	var minutes = Math.floor(secs / 60);
	secs = secs % 60;
	var hours = Math.floor(minutes / 60)
	minutes = minutes % 60;
	//return `${pad(hours)}:${pad(minutes)}:${pad(secs)}`;
	if (hours || minutes || secs) {
		return pad(hours) + ":" + pad(minutes) + ":" + pad(secs);
	} else {
		return null;
	}
}

const identitas_perusahaan = [
{ label: "Importir", value: '1' },
{ label: "Eksportir", value: '2' },
{ label: "Pengusaha", value: '3' },
{ label: "PPJK", value: '4' },
{ label: "Pemasok", value: '5' },
{ label: "Pembeli", value: '6' },
{ label: "Pemilik", value: '7' },
{ label: "Penerima", value: '8' },
{ label: "Pengirim", value: '9' },
{ label: "Penjual", value: '10' },
{ label: "Pemusatan", value: '11' }
];

export {
	totalwaktu,
	pad,
	jumlah,
	tglwaktu,
	tgl,
	find_label,
	is_expired,
	thn,
	identitas_perusahaan,

}