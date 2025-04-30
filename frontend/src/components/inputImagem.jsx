import '../styles/form.css';

export function InputImagem({ setImageFile, setImageURL, imageURL }) {
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file); // salva o arquivo real para envio
      const preview = URL.createObjectURL(file);
      setImageURL(preview); // exibe preview
    }
  };

  return (
    <>
      <input
        className='inputForm input-full'
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
      />
      {imageURL && (
        <div style={{ marginTop: '10px' }}>
          <img src={imageURL} alt="Preview" style={{ maxWidth: '280px' }} />
        </div>
      )}
    </>
  );
}
