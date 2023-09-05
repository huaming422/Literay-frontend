export const DPatientHead = [
  {
    field: 'id',
    label: 'No',
    type: 'text',
    width: 40
  },
  {
    field: 'name',
    label: 'Name',
    type: "text",
    width: 150
  },
  {
    field: 'patient_id',
    label: 'Patient ID',
    type: "text",
    width: 120
  },
  {
    field: 'patient_birthdate',
    label: 'Patient Birth Date',
    type: 'text',
    width: 100
  },
  {
    field: 'patient_sex',
    label: 'Patient Sex',
    type: 'text',
    width: 120
  },
  {
    field: 'other_patient_ids',
    label: 'Other Patient IDs',
    type: 'text',
    width: 200
  },
];

export const DStudyHead = [
  {
    field: 'id',
    label: 'No',
    type: 'text',
    width: 40
  },
  {
    field: 'name',
    label: 'Name',
    type: "text",
    width: 100
  },
  {
    field: 'study_date',
    label: 'Study Date',
    type: "text",
    width: 100
  },
  {
    field: 'accession_number',
    label: 'Accession Number',
    type: 'text',
    width: 100
  },
  {
    field: 'institution_name',
    label: 'Institution Nam',
    type: 'text',
    width: 100
  },
  {
    field: 'referring_physician_name',
    label: 'Referring Physician Name',
    type: 'text',
    width: 100
  },
  {
    field: 'study_instance_uid',
    label: 'Study Instance UID',
    type: 'text',
    width: 100
  },
  {
    field: 'study_id',
    label: 'Study ID',
    type: 'text',
    width: 100
  },
  {
    field: 'req_proce_desc',
    label: 'Requested Procedure Description',
    type: 'text',
    width: 200
  },
];

export const DSeries = [
  {
    field: 'id',
    label: 'No',
    type: 'text',
    width: 40
  },
  {
    field: 'name',
    label: 'Name',
    type: "text",
    width: 100
  },
  {
    field: 'status',
    label: 'Status',
    type: "text",
    width: 100
  },
  {
    field: 'modality',
    label: 'Modality',
    type: 'text',
    width: 100
  },
  {
    field: 'station_name',
    label: 'Station Name',
    type: 'text',
    width: 100
  },
  {
    field: 'operators_name',
    label: 'Operators Name',
    type: 'text',
    width: 100
  },
  {
    field: 'contrast_bolus_agent',
    label: 'Contrast Bolus Agent',
    type: 'text',
    width: 100
  },
  {
    field: 'protocal_name',
    label: 'Protocal Name',
    type: 'text',
    width: 100
  },
  {
    field: 'series_instance_uid',
    label: 'Series Instance UID',
    type: 'text',
    width: 200
  },
  {
    field: 'series_number',
    label: 'Series Number',
    type: 'text',
    width: 200
  },
];

export const DImages = [
  {
    field: 'id',
    label: 'No',
    type: 'text',
    width: 40
  },
  {
    field: 'name',
    label: 'Name',
    type: "text",
    width: 150
  },
  {
    field: 'sop_instance_uid',
    label: 'SOP Instance UID',
    type: "text",
    width: 120
  },
  {
    field: 'image_position_patient',
    label: 'Image Position Patient',
    type: 'text',
    width: 100
  },
  {
    field: 'image_orientation_patient',
    label: 'Image Orientation Patient',
    type: 'text',
    width: 120
  },
  {
    field: 'image_comments',
    label: 'Image Comments',
    type: 'text',
    width: 200
  },
];


export const DPatientColumnValues = [
  {
    "id": 1,
    "name": "CT Cardio CHN",
    "patient_id": "PS-Medtech demo data",
    "patient_birthdate": '1989-04-09',
    "patient_sex": "M",
    "other_patient_ids": "",
  },
  {
    "id": 2,
    "name": "DOE^J1",
    "patient_id": "1342344",
    "patient_birthdate": '1988-06-19',
    "patient_sex": "M",
    "other_patient_ids": "",
  },
  {
    "id": 3,
    "name": "HASSAINE FETTOUMA",
    "patient_id": "1934",
    "patient_birthdate": '1988-06-19',
    "patient_sex": "F",
    "other_patient_ids": "",
  }
]

export const DStudyColumnValues = [
  {
    "id": 1,
    "name": "Pelvis Feminin",
    "study_date": "1989-04-09",
    "accession_number": '11222',
    "institution_name": "CIMRI CHEVALLEY",
    "referring_physician_name": "Dr FERIEL HAFID",
    "study_instance_uid": "1.2.826.0.1.3680043.2.28105122072186062.230314175829.1",
    "study_id": "1222",
    "req_proce_desc": "",
  },
  {
    "id": 2,
    "name": "Pelvis Feminin",
    "study_date": "1989-04-09",
    "accession_number": '11222',
    "institution_name": "CIMRI CHEVALLEY",
    "referring_physician_name": "Dr FERIEL HAFID",
    "study_instance_uid": "1.2.826.0.1.3680043.2.28105122072186062.230314175829.1",
    "study_id": "1222",
    "req_proce_desc": "",
  },
  {
    "id": 3,
    "name": "Pelvis Feminin",
    "study_date": "1989-04-09",
    "accession_number": '11222',
    "institution_name": "CIMRI CHEVALLEY",
    "referring_physician_name": "Dr FERIEL HAFID",
    "study_instance_uid": "1.2.826.0.1.3680043.2.28105122072186062.230314175829.1",
    "study_id": "1222",
    "req_proce_desc": "",
  },
]

export const DSeriesColumnValues = [
  {
    "id": 1,
    "name": "75.0%",
    "status": "Unknown",
    "modality": 'CT',
    "station_name": "HOST-100233",
    "operators_name": "Anonymous",
    "contrast_bolus_agent": "CONTRAST",
    "protocal_name": "Coronary CTA- HR>72-FSYY/Cardiac",
    "series_instance_uid": "1.2.840.113704.1.111.7460.1355727334.22",
    "series_number": "5",
  },
  {
    "id": 2,
    "name": "75.0%",
    "status": "Unknown",
    "modality": 'CT',
    "station_name": "HOST-100233",
    "operators_name": "Anonymous",
    "contrast_bolus_agent": "CONTRAST",
    "protocal_name": "Coronary CTA- HR>72-FSYY/Cardiac",
    "series_instance_uid": "1.2.840.113704.1.111.7460.1355727334.22",
    "series_number": "5",
  },
  {
    "id": 3,
    "name": "75.0%",
    "status": "Unknown",
    "modality": 'CT',
    "station_name": "HOST-100233",
    "operators_name": "Anonymous",
    "contrast_bolus_agent": "CONTRAST",
    "protocal_name": "Coronary CTA- HR>72-FSYY/Cardiac",
    "series_instance_uid": "1.2.840.113704.1.111.7460.1355727334.22",
    "series_number": "5",
  },
  {
    "id": 4,
    "name": "75.0%",
    "status": "Unknown",
    "modality": 'CT',
    "station_name": "HOST-100233",
    "operators_name": "Anonymous",
    "contrast_bolus_agent": "CONTRAST",
    "protocal_name": "Coronary CTA- HR>72-FSYY/Cardiac",
    "series_instance_uid": "1.2.840.113704.1.111.7460.1355727334.22",
    "series_number": "5",
  },
]

export const DImagesColumnValues = [
  {
    "id": 1,
    "name": "Instance: 1",
    "sop_instance_uid": "1.2.840.113704.1.111.5632.1355727437.20848",
    "image_position_patient": '-96.00\-29.000\-964.100',
    "image_orientation_patient": "1.000\0.000\0.000\0.000\-1.000\0.000",
    "image_comments": "75.0%",
  },
  {
    "id": 2,
    "name": "Instance: 2",
    "sop_instance_uid": "1.2.840.113704.1.111.5632.1355727437.20848",
    "image_position_patient": '-96.00\-29.000\-964.100',
    "image_orientation_patient": "1.000\0.000\0.000\0.000\-1.000\0.000",
    "image_comments": "75.0%",
  },
  {
    "id": 3,
    "name": "Instance: 3",
    "sop_instance_uid": "1.2.840.113704.1.111.5632.1355727437.20848",
    "image_position_patient": '-96.00\-29.000\-964.100',
    "image_orientation_patient": "1.000\0.000\0.000\0.000\-1.000\0.000",
    "image_comments": "75.0%",
  },
  {
    "id": 4,
    "name": "Instance: 4",
    "sop_instance_uid": "1.2.840.113704.1.111.5632.1355727437.20848",
    "image_position_patient": '-96.00\-29.000\-964.100',
    "image_orientation_patient": "1.000\0.000\0.000\0.000\-1.000\0.000",
    "image_comments": "75.0%",
  },
  {
    "id": 5,
    "name": "Instance: 5",
    "sop_instance_uid": "1.2.840.113704.1.111.5632.1355727437.20848",
    "image_position_patient": '-96.00\-29.000\-964.100',
    "image_orientation_patient": "1.000\0.000\0.000\0.000\-1.000\0.000",
    "image_comments": "75.0%",
  },
  {
    "id": 6,
    "name": "Instance: 6",
    "sop_instance_uid": "1.2.840.113704.1.111.5632.1355727437.20848",
    "image_position_patient": '-96.00\-29.000\-964.100',
    "image_orientation_patient": "1.000\0.000\0.000\0.000\-1.000\0.000",
    "image_comments": "75.0%",
  },
  {
    "id": 7,
    "name": "Instance: 7",
    "sop_instance_uid": "1.2.840.113704.1.111.5632.1355727437.20848",
    "image_position_patient": '-96.00\-29.000\-964.100',
    "image_orientation_patient": "1.000\0.000\0.000\0.000\-1.000\0.000",
    "image_comments": "75.0%",
  },
  {
    "id": 8,
    "name": "Instance: 8",
    "sop_instance_uid": "1.2.840.113704.1.111.5632.1355727437.20848",
    "image_position_patient": '-96.00\-29.000\-964.100',
    "image_orientation_patient": "1.000\0.000\0.000\0.000\-1.000\0.000",
    "image_comments": "75.0%",
  },
  {
    "id": 9,
    "name": "Instance: 9",
    "sop_instance_uid": "1.2.840.113704.1.111.5632.1355727437.20848",
    "image_position_patient": '-96.00\-29.000\-964.100',
    "image_orientation_patient": "1.000\0.000\0.000\0.000\-1.000\0.000",
    "image_comments": "75.0%",
  },
  {
    "id": 10,
    "name": "Instance: 10",
    "sop_instance_uid": "1.2.840.113704.1.111.5632.1355727437.20848",
    "image_position_patient": '-96.00\-29.000\-964.100',
    "image_orientation_patient": "1.000\0.000\0.000\0.000\-1.000\0.000",
    "image_comments": "75.0%",
  },
  {
    "id": 11,
    "name": "Instance: 11",
    "sop_instance_uid": "1.2.840.113704.1.111.5632.1355727437.20848",
    "image_position_patient": '-96.00\-29.000\-964.100',
    "image_orientation_patient": "1.000\0.000\0.000\0.000\-1.000\0.000",
    "image_comments": "75.0%",
  },
  {
    "id": 12,
    "name": "Instance: 12",
    "sop_instance_uid": "1.2.840.113704.1.111.5632.1355727437.20848",
    "image_position_patient": '-96.00\-29.000\-964.100',
    "image_orientation_patient": "1.000\0.000\0.000\0.000\-1.000\0.000",
    "image_comments": "75.0%",
  },
  {
    "id": 13,
    "name": "Instance: 13",
    "sop_instance_uid": "1.2.840.113704.1.111.5632.1355727437.20848",
    "image_position_patient": '-96.00\-29.000\-964.100',
    "image_orientation_patient": "1.000\0.000\0.000\0.000\-1.000\0.000",
    "image_comments": "75.0%",
  },
  {
    "id": 14,
    "name": "Instance: 14",
    "sop_instance_uid": "1.2.840.113704.1.111.5632.1355727437.20848",
    "image_position_patient": '-96.00\-29.000\-964.100',
    "image_orientation_patient": "1.000\0.000\0.000\0.000\-1.000\0.000",
    "image_comments": "75.0%",
  },
  {
    "id": 15,
    "name": "Instance: 15",
    "sop_instance_uid": "1.2.840.113704.1.111.5632.1355727437.20848",
    "image_position_patient": '-96.00\-29.000\-964.100',
    "image_orientation_patient": "1.000\0.000\0.000\0.000\-1.000\0.000",
    "image_comments": "75.0%",
  },
  {
    "id": 16,
    "name": "Instance: 16",
    "sop_instance_uid": "1.2.840.113704.1.111.5632.1355727437.20848",
    "image_position_patient": '-96.00\-29.000\-964.100',
    "image_orientation_patient": "1.000\0.000\0.000\0.000\-1.000\0.000",
    "image_comments": "75.0%",
  },
  {
    "id": 17,
    "name": "Instance: 17",
    "sop_instance_uid": "1.2.840.113704.1.111.5632.1355727437.20848",
    "image_position_patient": '-96.00\-29.000\-964.100',
    "image_orientation_patient": "1.000\0.000\0.000\0.000\-1.000\0.000",
    "image_comments": "75.0%",
  },
  {
    "id": 18,
    "name": "Instance: 18",
    "sop_instance_uid": "1.2.840.113704.1.111.5632.1355727437.20848",
    "image_position_patient": '-96.00\-29.000\-964.100',
    "image_orientation_patient": "1.000\0.000\0.000\0.000\-1.000\0.000",
    "image_comments": "75.0%",
  },
  {
    "id": 19,
    "name": "Instance: 19",
    "sop_instance_uid": "1.2.840.113704.1.111.5632.1355727437.20848",
    "image_position_patient": '-96.00\-29.000\-964.100',
    "image_orientation_patient": "1.000\0.000\0.000\0.000\-1.000\0.000",
    "image_comments": "75.0%",
  },
  {
    "id": 20,
    "name": "Instance: 20",
    "sop_instance_uid": "1.2.840.113704.1.111.5632.1355727437.20848",
    "image_position_patient": '-96.00\-29.000\-964.100',
    "image_orientation_patient": "1.000\0.000\0.000\0.000\-1.000\0.000",
    "image_comments": "75.0%",
  },
  {
    "id": 21,
    "name": "Instance: 21",
    "sop_instance_uid": "1.2.840.113704.1.111.5632.1355727437.20848",
    "image_position_patient": '-96.00\-29.000\-964.100',
    "image_orientation_patient": "1.000\0.000\0.000\0.000\-1.000\0.000",
    "image_comments": "75.0%",
  },
  {
    "id": 22,
    "name": "Instance: 22",
    "sop_instance_uid": "1.2.840.113704.1.111.5632.1355727437.20848",
    "image_position_patient": '-96.00\-29.000\-964.100',
    "image_orientation_patient": "1.000\0.000\0.000\0.000\-1.000\0.000",
    "image_comments": "75.0%",
  },
  {
    "id": 23,
    "name": "Instance: 23",
    "sop_instance_uid": "1.2.840.113704.1.111.5632.1355727437.20848",
    "image_position_patient": '-96.00\-29.000\-964.100',
    "image_orientation_patient": "1.000\0.000\0.000\0.000\-1.000\0.000",
    "image_comments": "75.0%",
  },
  {
    "id": 24,
    "name": "Instance: 24",
    "sop_instance_uid": "1.2.840.113704.1.111.5632.1355727437.20848",
    "image_position_patient": '-96.00\-29.000\-964.100',
    "image_orientation_patient": "1.000\0.000\0.000\0.000\-1.000\0.000",
    "image_comments": "75.0%",
  },
  {
    "id": 25,
    "name": "Instance: 25",
    "sop_instance_uid": "1.2.840.113704.1.111.5632.1355727437.20848",
    "image_position_patient": '-96.00\-29.000\-964.100',
    "image_orientation_patient": "1.000\0.000\0.000\0.000\-1.000\0.000",
    "image_comments": "75.0%",
  },
  {
    "id": 26,
    "name": "Instance: 26",
    "sop_instance_uid": "1.2.840.113704.1.111.5632.1355727437.20848",
    "image_position_patient": '-96.00\-29.000\-964.100',
    "image_orientation_patient": "1.000\0.000\0.000\0.000\-1.000\0.000",
    "image_comments": "75.0%",
  },
  {
    "id": 27,
    "name": "Instance: 27",
    "sop_instance_uid": "1.2.840.113704.1.111.5632.1355727437.20848",
    "image_position_patient": '-96.00\-29.000\-964.100',
    "image_orientation_patient": "1.000\0.000\0.000\0.000\-1.000\0.000",
    "image_comments": "75.0%",
  },
  {
    "id": 28,
    "name": "Instance: 28",
    "sop_instance_uid": "1.2.840.113704.1.111.5632.1355727437.20848",
    "image_position_patient": '-96.00\-29.000\-964.100',
    "image_orientation_patient": "1.000\0.000\0.000\0.000\-1.000\0.000",
    "image_comments": "75.0%",
  },
  {
    "id": 29,
    "name": "Instance: 29",
    "sop_instance_uid": "1.2.840.113704.1.111.5632.1355727437.20848",
    "image_position_patient": '-96.00\-29.000\-964.100',
    "image_orientation_patient": "1.000\0.000\0.000\0.000\-1.000\0.000",
    "image_comments": "75.0%",
  },
  {
    "id": 30,
    "name": "Instance: 30",
    "sop_instance_uid": "1.2.840.113704.1.111.5632.1355727437.20848",
    "image_position_patient": '-96.00\-29.000\-964.100',
    "image_orientation_patient": "1.000\0.000\0.000\0.000\-1.000\0.000",
    "image_comments": "75.0%",
  },
  {
    "id": 31,
    "name": "Instance: 31",
    "sop_instance_uid": "1.2.840.113704.1.111.5632.1355727437.20848",
    "image_position_patient": '-96.00\-29.000\-964.100',
    "image_orientation_patient": "1.000\0.000\0.000\0.000\-1.000\0.000",
    "image_comments": "75.0%",
  },
  {
    "id": 32,
    "name": "Instance: 32",
    "sop_instance_uid": "1.2.840.113704.1.111.5632.1355727437.20848",
    "image_position_patient": '-96.00\-29.000\-964.100',
    "image_orientation_patient": "1.000\0.000\0.000\0.000\-1.000\0.000",
    "image_comments": "75.0%",
  },
  {
    "id": 33,
    "name": "Instance: 33",
    "sop_instance_uid": "1.2.840.113704.1.111.5632.1355727437.20848",
    "image_position_patient": '-96.00\-29.000\-964.100',
    "image_orientation_patient": "1.000\0.000\0.000\0.000\-1.000\0.000",
    "image_comments": "75.0%",
  },
  {
    "id": 34,
    "name": "Instance: 34",
    "sop_instance_uid": "1.2.840.113704.1.111.5632.1355727437.20848",
    "image_position_patient": '-96.00\-29.000\-964.100',
    "image_orientation_patient": "1.000\0.000\0.000\0.000\-1.000\0.000",
    "image_comments": "75.0%",
  },
  {
    "id": 35,
    "name": "Instance: 35",
    "sop_instance_uid": "1.2.840.113704.1.111.5632.1355727437.20848",
    "image_position_patient": '-96.00\-29.000\-964.100',
    "image_orientation_patient": "1.000\0.000\0.000\0.000\-1.000\0.000",
    "image_comments": "75.0%",
  },
  {
    "id": 36,
    "name": "Instance: 36",
    "sop_instance_uid": "1.2.840.113704.1.111.5632.1355727437.20848",
    "image_position_patient": '-96.00\-29.000\-964.100',
    "image_orientation_patient": "1.000\0.000\0.000\0.000\-1.000\0.000",
    "image_comments": "75.0%",
  },
  {
    "id": 37,
    "name": "Instance: 37",
    "sop_instance_uid": "1.2.840.113704.1.111.5632.1355727437.20848",
    "image_position_patient": '-96.00\-29.000\-964.100',
    "image_orientation_patient": "1.000\0.000\0.000\0.000\-1.000\0.000",
    "image_comments": "75.0%",
  },
  {
    "id": 38,
    "name": "Instance: 38",
    "sop_instance_uid": "1.2.840.113704.1.111.5632.1355727437.20848",
    "image_position_patient": '-96.00\-29.000\-964.100',
    "image_orientation_patient": "1.000\0.000\0.000\0.000\-1.000\0.000",
    "image_comments": "75.0%",
  },
  {
    "id": 39,
    "name": "Instance: 39",
    "sop_instance_uid": "1.2.840.113704.1.111.5632.1355727437.20848",
    "image_position_patient": '-96.00\-29.000\-964.100',
    "image_orientation_patient": "1.000\0.000\0.000\0.000\-1.000\0.000",
    "image_comments": "75.0%",
  },
]