import '../styles/form.css';

export function InputImagem({ imageURL, setImageURL }) {
    const handleImageUpload = (e) => {
      const file = e.target.files[0];
      if (file) {
        const imageUrl = URL.createObjectURL(file);
        setImageURL(imageUrl);
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
  