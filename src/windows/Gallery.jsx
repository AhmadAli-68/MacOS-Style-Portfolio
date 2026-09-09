import { WindowsControls } from '@components'
import { gallery, photosLinks } from '@constants'
import WindowWrapper from '@hoc/WindowWrapper'
import useWindowStore from '@store/window'
import { Mail, Search } from 'lucide-react'

const Gallery = () => {
  const { openWindow } = useWindowStore();

  return (
    <>
      <div id='window-header'>
        <WindowsControls target='photos' />

        <div className='flex gap-3 justify-end items-center ml-5'>
          <Mail className='icon' />
          <Search className='icon' />
        </div>
      </div>

      <div className='bg-white flex w-full'>
        <div className='sidebar'>
          <h2>Photos</h2>
          <ul>
            {photosLinks.map(({ id, icon, title }) => (
              <li key={id}>
                <img src={icon} className='w-4' alt={title} />
                <p className='text-sm font-medium truncate'>{title}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className='gallery'>
          <ul>
            {gallery.map(({ id, img }) => (
              <li
                key={id}
                onClick={() =>
                  openWindow('imgfile', {
                    id,
                    name: 'Gallery Image',
                    icon: '/images/image.png',
                    kind: 'file',
                    fileType: 'img',
                    imageUrl: img
                  })}
              >
                <img src={img} alt={`Gallery Image ${id}`} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}

const GalleryWrapper = WindowWrapper(Gallery, 'photos')

export default GalleryWrapper