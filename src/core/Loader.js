import React from 'react'
import './Loader.css'
const Loader = () => {
  return (
    <div class="modal fade" id="loaderModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
  <button type="button" class="close" id='loaderClose' data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true"></span>
        </button>
      <div class="modal-body">
      <span class="loader"></span>
      </div>
    
  </div>
</div>
  )
}

export default Loader