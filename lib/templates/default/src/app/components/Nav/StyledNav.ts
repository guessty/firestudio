import styled from 'styled-components'
//

export default styled.div`
  .nav {
    padding: 0 20px;
    border-bottom: 1px solid lightgrey;

    &__link {
      display: block;
      height: 63px;
      line-height: 63px;
      white-space: nowrap;
    }

    &__logo {
      width: 40px;
      display: block;
      position: relative;

      img {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
      }
    }
  }
`
