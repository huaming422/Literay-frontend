export const DPatientHead = [
  {
    field: 'name',
    tag: '0010,0010',
    label: 'Name',
    type: "text",
    width: 150
  },
  {
    field: 'patient_id',
    label: 'Patient ID',
    tag: '0010,0020',
    type: "text",
    width: 250
  },
  {
    field: 'patient_birthdate',
    label: 'Patient Birth Date',
    tag: '0010,0030',
    type: 'date',
    width: 200
  },
  {
    field: 'patient_sex',
    label: 'Patient Sex',
    tag: '0010,0040',
    type: 'text',
    width: 120
  },
  {
    field: 'other_patient_ids',
    label: 'Other Patient IDs',
    tag: '0010,1000',
    type: 'text',
    width: 220
  },
];

export const DStudyHead = [
  {
    field: 'name',
    tag: '0008,1030',
    label: 'Name',
    type: "text",
    width: 200
  },
  {
    field: 'study_date',
    tag: '0008,0020',
    label: 'Study Date',
    type: "date",
    width: 100
  },
  {
    field: 'accession_number',
    tag: '0008,0050',
    label: 'Accession Number',
    type: 'text',
    width: 130
  },
  {
    field: 'institution_name',
    tag: '0008,0080',
    label: 'Institution Nam',
    type: 'text',
    width: 140
  },
  {
    field: 'referring_physician_name',
    tag: '0008,0090',
    label: 'Referring Physician Name',
    type: 'text',
    width: 160
  },
  {
    field: 'study_instance_uid',
    tag: '0020,000d',
    label: 'Study Instance UID',
    type: 'text',
    width: 250
  },
  {
    field: 'study_id',
    tag: '0020,0010',
    label: 'Study ID',
    type: 'text',
    width: 100
  },
  {
    field: 'req_proce_desc',
    tag: '0032,1060',
    label: 'Requested Procedure Description',
    type: 'text',
    width: 200
  },
];

export const DSeriesHead = [
  {
    field: 'name',
    tag: '0008,103e',
    label: 'Name',
    type: "text",
    width: 100
  },
  {
    field: 'status',
    label: 'Status',
    type: "status",
    width: 100
  },
  {
    field: 'modality',
    tag: '0008,0060',
    label: 'Modality',
    type: 'text',
    width: 130
  },
  {
    field: 'station_name',
    tag: '0008,1010',
    label: 'Station Name',
    type: 'text',
    width: 150
  },
  {
    field: 'operators_name',
    tag: '0008,1070',
    label: 'Operators Name',
    type: 'text',
    width: 150
  },
  {
    field: 'contrast_bolus_agent',
    tag: '0018,0010',
    label: 'Contrast Bolus Agent',
    type: 'text',
    width: 200
  },
  {
    field: 'protocal_name',
    tag: '0018,1030',
    label: 'Protocal Name',
    type: 'text',
    width: 200
  },
  {
    field: 'series_instance_uid',
    tag: '0020,000e',
    label: 'Series Instance UID',
    type: 'text',
    width: 250
  },
  {
    field: 'series_number',
    tag: '0020,0011',
    label: 'Series Number',
    type: 'text',
    width: 100
  },
];

export const DImagesHead = [
  {
    field: 'name',
    tag: '0020,0013',
    label: 'Instance',
    type: "text",
    width: 120
  },
  {
    field: 'sop_instance_uid',
    tag: '0008,0018',
    label: 'SOP Instance UID',
    type: "text",
    width: 250
  },
  {
    field: 'image_position_patient',
    tag: '0020,0032',
    label: 'Image Position Patient',
    type: 'text',
    width: 200
  },
  {
    field: 'image_orientation_patient',
    tag: '0020,0037',
    label: 'Image Orientation Patient',
    type: 'text',
    width: 200
  },
  {
    field: 'image_comments',
    tag: '0020,4000',
    label: 'Image Comments',
    type: 'text',
    width: 350
  },
  {
    field: 'create_date',
    tag: '0008,0012',
    label: 'Create Date',
    type: 'text',
    width: 100
  },
];