const PINATA_JWT = import.meta.env.VITE_PINATA_JWT

export async function uploadFileToPinata(file) {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('pinataMetadata', JSON.stringify({ name: file.name }))

  const res = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
    method: 'POST',
    headers: { Authorization: `Bearer ${PINATA_JWT}` },
    body: formData,
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Pinata file upload failed (${res.status}): ${text}`)
  }

  const data = await res.json()
  return data.IpfsHash
}

export async function uploadMetadataToPinata(metadata) {
  const res = await fetch('https://api.pinata.cloud/pinning/pinJSONToIPFS', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${PINATA_JWT}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      pinataContent: metadata,
      pinataMetadata: { name: `diploma-${metadata.name}` },
    }),
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Pinata metadata upload failed (${res.status}): ${text}`)
  }

  const data = await res.json()
  return data.IpfsHash
}
