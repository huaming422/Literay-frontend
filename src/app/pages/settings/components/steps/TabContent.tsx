/* eslint-disable array-callback-return */
import React from 'react'
import TextInput from './TextInput';

const TabContent = (props: any) => {
  const { statistics, systemInfo } = props;

  return (
    <div className='w-100' >
      <div className='pb-6'>
        <div className='d-flex justify-content-between'>
          <div className='d-flex'>
            <h2 className='fw-bolder align-items-center  text-dark'>
              {
                "Statistics"
              }
            </h2>
          </div>
        </div>
      </div>

      <div className='w-100'>
        <div className='row g-6 g-xl-9'>
          <div className="col-md-6">
            <TextInput
              value={statistics.CountStudies}
              name="studies"
              header={"Studies"}
              handleChange={() => { }}
            />
            <TextInput
              value={statistics.CountSeries}
              name="series"
              header={"Series"}
              handleChange={() => { }}
            />

          </div>
          <div className="col-md-6">
            <TextInput
              value={statistics.CountInstances}
              name="instances"
              header={"Instances"}
              handleChange={() => { }}
            />
            <TextInput
              value={`${statistics.TotalUncompressedSizeMB}MB`}
              name="storagesize"
              header={"Storage Size"}
              handleChange={() => { }}
            />


          </div>
        </div>
      </div>
      <div className='pb-6 pt-6'>
        <div className='d-flex justify-content-between'>
          <div className='d-flex'>
            <h2 className='fw-bolder align-items-center  text-dark'>
              {
                "System Info"
              }
            </h2>
          </div>
        </div>
      </div>

      <div className='w-100'>
        <div className='row g-6 g-xl-9'>
          <div className="col-md-6">
            <TextInput
              value={systemInfo.Version}
              name="version"
              header={"Version"}
              handleChange={() => { }}
            />
            <TextInput
              value={systemInfo.Name}
              name="name"
              header={"Name"}
              handleChange={() => { }}
            />
            <TextInput
              value={systemInfo.DicomAet}
              name="aet"
              header={"DICOM AET"}
              handleChange={() => { }}
            />
            <TextInput
              value={systemInfo.DicomPort}
              name="port"
              header={"DICOM Port"}
              handleChange={() => { }}
            />
          </div>
          <div className="col-md-6">
            <TextInput
              value={systemInfo.IngestTranscoding}
              name="ingest_transcoding"
              header={"Ingest Transcoding"}
              handleChange={() => { }}
            />
            <TextInput
              value={systemInfo.OverwriteInstances}
              name="instances"
              header={"Overwrite instances"}
              handleChange={() => { }}
            />
            <TextInput
              value={systemInfo.StorageCompression}
              name="storage_compression"
              header={"Storage Compression"}
              handleChange={() => { }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export { TabContent }
