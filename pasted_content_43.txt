import { useState, useEffect } from 'react';

interface InstagramPost {
  url: string;
  imageUrl: string;
  caption: string;
}

const instagramPosts: InstagramPost[] = [
  {
    url: 'https://www.instagram.com/reel/ClBdCWEgf5z/',
    imageUrl: 'https://scontent.cdninstagram.com/v/t51.29350-15/316199438_1280766959339026_7441372833464782137_n.jpg',
    caption: 'ハロウィンイベント🎃'
  },
  {
    url: 'https://www.instagram.com/p/C1Jv5VIv2L-/',
    imageUrl: 'https://scontent.cdninstagram.com/v/t51.29350-15/418906628_1090476615392849_3123456789012345678_n.jpg',
    caption: 'クリスマスパーティー🎄'
  },
  {
    url: 'https://www.instagram.com/p/DByKZtfTp08/',
    imageUrl: 'https://scontent.cdninstagram.com/v/t51.29350-15/462345678_901234567890123_4567890123456789012_n.jpg',
    caption: '日々の活動✨'
  },
  {
    url: 'https://www.instagram.com/p/C7TG3PLvtOa/',
    imageUrl: 'https://scontent.cdninstagram.com/v/t51.29350-15/445678901_234567890123456_7890123456789012345_n.jpg',
    caption: '作品制作中🎨'
  },
  {
    url: 'https://www.instagram.com/p/CqXqQBIPAKx/',
    imageUrl: 'https://scontent.cdninstagram.com/v/t51.29350-15/345678901_567890123456789_0123456789012345678_n.jpg',
    caption: 'イベント準備🎉'
  }
];

export default function InstagramCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(true);

  // Duplicate posts for infinite loop effect
  const extendedPosts = [...instagramPosts, ...instagramPosts, ...instagramPosts];

  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, 3000); // Slide every 3 seconds

      return () => clearInterval(interval);
    }
  }, [isHovered]);

  // Handle infinite loop reset
  useEffect(() => {
    if (currentIndex >= instagramPosts.length * 2) {
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(instagramPosts.length);
      }, 500);
      
      setTimeout(() => {
        setIsTransitioning(true);
      }, 550);
    } else if (currentIndex < instagramPosts.length) {
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(instagramPosts.length + currentIndex);
      }, 500);
      
      setTimeout(() => {
        setIsTransitioning(true);
      }, 550);
    }
  }, [currentIndex]);

  return (
    <section className="py-16 bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Instagram
            <span className="block h-1 w-20 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mt-2"></span>
          </h2>
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-purple-600 via-pink-600 to-orange-500 flex items-center justify-center">
              <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </div>
            <div>
              <a 
                href="https://www.instagram.com/studio.m2022/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xl font-semibold hover:text-purple-600 transition-colors"
              >
                @studio.m2022
              </a>
              <p className="text-sm text-gray-600">最新の投稿をチェック</p>
            </div>
          </div>
          <a
            href="https://www.instagram.com/studio.m2022/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 text-white rounded-full hover:shadow-lg transition-all duration-300 hover:scale-105"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            Instagramをフォロー
          </a>
        </div>

        {/* Carousel - 3 images side by side */}
        <div 
          className="relative overflow-hidden max-w-6xl mx-auto"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div 
            className={`flex gap-4 ${isTransitioning ? 'transition-transform duration-500 ease-linear' : ''}`}
            style={{ 
              transform: `translateX(-${currentIndex * (100 / 3 + 1.33)}%)`,
            }}
          >
            {extendedPosts.map((post, index) => (
              <a
                key={index}
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 w-[calc(33.333%-11px)] group cursor-pointer"
              >
                <div className="relative aspect-square overflow-hidden rounded-lg shadow-lg bg-white">
                  <iframe
                    src={`${post.url}embed/captioned`}
                    className="w-full h-full border-0"
                    scrolling="no"
                    allowTransparency={true}
                    allow="encrypted-media"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <p className="text-white text-sm font-medium">{post.caption}</p>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Description */}
        <div className="text-center mt-8 max-w-2xl mx-auto">
          <p className="text-gray-700 leading-relaxed">
            日々の活動の様子や作品、イベント情報などをInstagramで発信しています。<br />
            ぜひフォローして最新情報をチェックしてください！
          </p>
        </div>
      </div>
    </section>
  );
}

