export default function ConvertOptions(options, key = 'name') {
	return options.map((item) => ({ 
	  value: item.id, 
	  label: item[key]
	}));
}
