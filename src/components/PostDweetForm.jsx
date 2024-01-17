import React from 'react'
import style from './style.module.scss'

export default function PostDweetForm() {
  return (
    <form className={style.post}> 
      <textarea name="" id=""/>
      <div className={style.file}>
        <label htmlFor='file'>
          <div>파일선택</div>
        </label>
        <input placeholder='첨부파일'/>
      </div>
      <input type="file" id='file' multiple />
      <input type='submit' value='post'/>
    </form>
  )
}

