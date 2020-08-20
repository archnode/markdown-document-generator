---
title: 'Example-Charts'
subtitle: 'example.at'
company: 'Example GmbH'
company_contact: 'Max Mustermann'
date: 2020-01-01
version: '1.0'
---

# Chart examples

## Area Chart

```apex
{
  "chart": {
    "type": "area"
  },
  "series": [{
    "name": "sales",
    "data": [30,40,45,50,49,60,70,91,125]
  }],
  "xaxis": {
    "type": "datetime",
    "categories": ["01/01/1991","01/01/1992","01/01/1993","01/01/1994","01/01/1995","01/01/1996","01/01/1997", "01/01/1998","01/01/1999"]
  }
}
```

## Radial Bar

```apex
{
  "series": [76, 67, 61, 90],
  "chart": {
    "height": 390,
    "type": "radialBar"
  },
  "plotOptions": {
    "radialBar": {
      "offsetY": 0,
      "startAngle": 0,
      "endAngle": 270,
      "hollow": {
        "margin": 5,
        "size": "30%",
        "background": "transparent",
        "image": null
      },
      "dataLabels": {
        "name": {
          "show": false
        },
        "value": {
          "show": false
        }
      }
    }
  },
  "colors": ["#1ab7ea", "#0084ff", "#39539E", "#0077B5"],
  "labels": ["Vimeo", "Messenger", "Facebook", "LinkedIn"],
  "legend": {
    "show": true,
    "floating": true,
    "fontSize": "16px",
    "position": "left",
    "offsetX": 160,
    "offsetY": 15,
    "labels": {
      "useSeriesColors": true
    },
    "markers": {
      "size": 0
    },
    "itemMargin": {
      "vertical": 3
    }
  }
}
```

## Bar

```apex
{
	"chart": {
		"type": "bar",
		"height": 350,
		"stacked": true
	},
	"plotOptions": {
		"bar": {
			"horizontal": true
		}
	},
	"stroke": {
		"width": 1,
		"colors": ["#fff"]
	},
	"title": {
		"text": "Fiction&nbsp;Books&nbsp;Sales"
	},
	"xaxis": {
		"categories": [2008, 2009, 2010, 2011, 2012, 2013, 2014]
	},
	"yaxis": {
		"title": {
			"text": null
		}
	},
	"fill": {
		"opacity": 1
	},
	"legend": {
		"position": "top",
		"horizontalAlign": "left",
		"offsetX": 40
	},
  "series": [
    {
      "name": "Marine&nbsp;Sprite",
      "data": [44, 55, 41, 37, 22, 43, 21]
    },
    {
      "name": "Striking&nbsp;Calf",
      "data": [53, 32, 33, 52, 13, 43, 32]
    },
    {
      "name": "Tank&nbsp;Picture",
      "data": [12, 17, 11, 9, 15, 11, 20]
    },
    {
      "name": "Bucket&nbsp;Slope",
      "data": [9, 7, 5, 8, 6, 9, 4]
    },
    {
      "name": "Reborn&nbsp;Kid",
      "data": [25, 12, 19, 32, 25, 24, 10]
    }
  ]
}
```
