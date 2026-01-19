import { css } from "@umbraco-cms/backoffice/external/lit";

export const style = css`
.multilang-row {
    display: flex;
    gap: 10px;
    margin-bottom: 5px;

    & > uui-input, & > uui-textarea {
        flex: 1;
        max-width: 800px;
    }

    .label {
        width: 160px;
    }
}
.required {
    color: var(--uui-color-danger-standalone,rgb(191, 33, 78));
}
`;